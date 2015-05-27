module Hello where

import Control.Monad.Eff
import Control.Monad.Knockout
import Debug.Trace

main = do
    obs <- newObservable
    writeObservable obs 42
    trace "Hello, World!"
    return { x: obs }