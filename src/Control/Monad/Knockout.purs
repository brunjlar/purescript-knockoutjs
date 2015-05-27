module Control.Monad.Knockout where

import Control.Monad.Eff
import DOM

foreign import data Observable :: * -> *

foreign import observable
    """
    function observable(value) {
        return function () {
            return ko.observable(value);
        };
    }
    """
    :: forall a eff. a -> Eff (dom :: DOM | eff) (Observable a)