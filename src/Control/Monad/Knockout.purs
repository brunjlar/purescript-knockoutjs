module Control.Monad.Knockout (
    NewObservable (..),
    WriteObservable (..),
    ReadObservable (..),
    Observable (..),
    PureComputed (..),
    Extract,
    extract,
    newObservable,
    writeObservable,
    pureComputed
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

class Extract f a where
    extract :: forall eff. f a -> Eff (readObservable :: ReadObservable | eff) (Maybe a)

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
    
foreign import readObservable
    """
    function readObservable(obs) {
        return function () {
            return obs();
        };
    }
    """
    :: forall a eff. Observable a -> Eff (readObservable :: ReadObservable | eff) Foreign
        
instance observableCanExtract :: (IsForeign a) => Extract Observable a where
    extract = (<$>) foreignToMaybe <<< readObservable
        
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
    
foreign import readPureComputed
    """
    function readPureComputed(comp) {
        return function () {
            return comp();
        };
    }
    """
    :: forall a eff. PureComputed a -> Eff (readObservable :: ReadObservable | eff) Foreign
    
instance pureComputedCanExtract :: (IsForeign a) => Extract PureComputed a where
    extract = (<$>) foreignToMaybe <<< readPureComputed
        