module Control.Monad.Knockout (
    NewObservable (..),
    WriteObservable (..),
    ReadObservable (..),
    Observable (..),
    PureComputed (..),
    newObservable,
    writeObservable,
    readObservable,
    pureComputed,
    readPureComputed
) where

import Control.Monad.Eff
import Data.Either
import Data.Foreign
import Data.Foreign.Class
import Data.Maybe
import Utils

foreign import data NewObservable :: !
foreign import data WriteObservable :: !
foreign import data ReadObservable :: !

foreign import data Observable :: * -> *
foreign import data PureComputed :: * -> *

foreign import newObservable
    """
    function newObservable() {
        return ko.observable();
    }
    """
    :: forall a eff. Eff (newObservable :: NewObservable | eff) (Observable a)
    
foreign import writeObservable
    """
    function writeObservable(obs) {
        return function (value) {
            return function () {
                obs(value);
            };
        };
    }
    """
    :: forall a eff. Observable a -> a -> Eff (writeObservable :: WriteObservable | eff) Unit
    
foreign import readObservableCore
    """
    function readObservableCore(obs) {
        return function () {
            return obs();
        };
    }
    """
    :: forall a eff. Observable a -> Eff (readObservable :: ReadObservable | eff) Foreign
        
readObservable :: forall a eff. (IsForeign a) => Observable a -> Eff (readObservable :: ReadObservable | eff) (Maybe a)
readObservable = (<$>) foreignToMaybe <<< readObservableCore
        
foreign import pureComputed
    """
    function pureComputed(f) {
        return function () {
            return ko.pureComputed(function () {
                return f();
            });
        };
    }
    """
    :: forall a eff. Eff (readObservable :: ReadObservable) a -> Eff (newObservable :: NewObservable | eff) (PureComputed a)
    
foreign import readPureComputedCore
    """
    function readPureComputedCore(comp) {
        return function () {
            return comp();
        };
    }
    """
    :: forall a eff. PureComputed a -> Eff (readObservable :: ReadObservable | eff) Foreign
    
readPureComputed :: forall a eff. (IsForeign a) => PureComputed a -> Eff (readObservable :: ReadObservable | eff) a
readPureComputed comp = do
    x <- readPureComputedCore comp
    return $ case foreignToMaybe x of
        Just y -> y
        