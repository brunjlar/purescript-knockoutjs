module Control.Monad.Knockout (
    NewObservable (..),
    WriteObservable (..),
    ReadObservable (..),
    Observable (..),
    newObservable,
    writeObservable,
    readObservable
) where

import Control.Monad.Eff
import Data.Either
import Data.Foreign
import Data.Foreign.Class
import Data.Maybe

foreign import data NewObservable :: !
foreign import data WriteObservable :: !
foreign import data ReadObservable :: !

foreign import data Observable :: * -> *

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
readObservable obs = do
    x' <- readObservableCore obs
    return $ case read x' of
        Left _  -> Nothing
        Right x -> Just x