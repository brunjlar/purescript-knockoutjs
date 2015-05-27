module Hello where

import Control.Monad.Knockout
import Debug.Trace

main = do
    x <- observable 42
    trace "Hello, World!"
    return { x: x }