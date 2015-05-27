module Hello where

import Control.Monad.Eff
import Control.Monad.Knockout
import Data.Maybe
import Debug.Trace
import Global

main = do
    text <- newObservable
    
    once <- pureComputed $ do
        x <- extract text
        return $ case x of
            Nothing -> 0
            Just t  -> readFloat t
    twice <- pureComputed $ do
        Just once' <- extract once
        return $ 2 * once'
    thrice <- pureComputed $ do
        Just once'  <- extract once
        Just twice' <- extract twice
        return $ once' + twice'
    
    return { 
        text  : text,
        once  : once,
        twice : twice,
        thrice: thrice }