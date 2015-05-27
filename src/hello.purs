module Hello where

import Control.Monad.Eff
import Control.Monad.Knockout
import Data.Maybe
import Debug.Trace
import Global

main = do
    text <- newObservable
    
    once <- pureComputed $ do
        x <- readObservable text
        return $ case x of
            Nothing -> 0
            Just t  -> let y = readFloat t in if isNaN y then 0 else y
    twice <- pureComputed $ (2 *) <$> readPureComputed once
    thrice <- pureComputed $ (+) <$> readPureComputed once <*> readPureComputed twice
    
    return { 
        text  : text,
        once  : once,
        twice : twice,
        thrice: thrice }