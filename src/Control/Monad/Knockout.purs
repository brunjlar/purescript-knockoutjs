module Control.Monad.Knockout (
    KO (..),
    Observable (..),
    newObservable,
    writeObservable,
    readObservable
) where

import Control.Monad.Eff
import Data.Foreign

foreign import data KO :: !

foreign import data Observable :: * -> *

foreign import newObservable
    """
    function newObservable() {
        return ko.observable();
    }
    """
    :: forall a eff. Eff (ko :: KO | eff) (Observable a)
    
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
    :: forall a eff. Observable a -> a -> Eff (ko :: KO | eff) Unit
    
foreign import readObservable
    """
    function readObservable(obs) {
        return function () {
            return obs();
        };
    }
    """
    :: forall a eff. Observable a -> Eff (ko :: KO | eff) Foreign