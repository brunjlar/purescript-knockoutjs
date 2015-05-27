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

-- |The effect type for creating an observable.
foreign import data NewObservable :: !

-- |The effect type for writing to an observable.
foreign import data WriteObservable :: !

-- |The effect type for reading from an observable.
foreign import data ReadObservable :: !

-- |`Observable a` is the type of writable observable values of type `a`.
foreign import data Observable :: * -> *

-- |`PureComputed a` is the type of pure computed observable values of type `a`.
foreign import data PureComputed :: * -> *

-- |Creates a new writable observable.
foreign import newObservable
    """
    function newObservable() {
        return ko.observable();
    }
    """
    :: forall a eff. Eff (newObservable :: NewObservable | eff) (Observable a)
    
-- |Sets the value of a writable observable.
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
        
-- |Reads the value from a writable observable. The result is wrapped into `Maybe`, because the value could have been set to the wrong type from the outside.
readObservable :: forall a eff. (IsForeign a) => Observable a -> Eff (readObservable :: ReadObservable | eff) (Maybe a)
readObservable = (<$>) foreignToMaybe <<< readObservableCore
        
-- |Creates a new pure computed observable. The computation defining the observable is allowed to read the values of other observables.
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
    
-- |Reads the value of a pure computed observable. In contrast to *writable* observables,
-- |this value can not have been corrupted from the outside, so it does not have to be wrapped into `Maybe`.
readPureComputed :: forall a eff. (IsForeign a) => PureComputed a -> Eff (readObservable :: ReadObservable | eff) a
readPureComputed comp = do
    x <- readPureComputedCore comp
    return $ case foreignToMaybe x of
        Just y -> y
        
eitherToMaybe :: forall a e. Either e a -> Maybe a
eitherToMaybe (Left _)  = Nothing
eitherToMaybe (Right x) = Just x

foreignToMaybe :: forall a. (IsForeign a) => Foreign -> Maybe a
foreignToMaybe = eitherToMaybe <<< read