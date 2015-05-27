module Hello where

import Control.Monad.Eff
import Control.Monad.Knockout
import Data.Either
import Data.Foreign
import Data.Foreign.Class
import Debug.Trace
import Global

main = do
    obs <- newObservable
    writeObservable obs 42
    value <- readObservable obs
    case (read value :: F Number) of
        Left e  -> trace $ "error: " ++ show e
        Right x -> trace $ "value: " ++ show x
    return { x: obs }