module Hello where

import Control.Monad.Eff
import Control.Monad.Knockout
import Data.Maybe
import Debug.Trace
import Global

main = do
    obs <- newObservable
    writeObservable obs 42
    maybeValue <- readObservable obs
    case maybeValue of
        Nothing    -> trace $ "error!"
        Just value -> trace $ "value: " ++ show value
    return { x: obs }