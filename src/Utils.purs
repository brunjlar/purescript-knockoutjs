module Utils (
    eitherToMaybe,
    foreignToMaybe
) where

import Data.Either
import Data.Foreign
import Data.Foreign.Class
import Data.Maybe

eitherToMaybe :: forall a e. Either e a -> Maybe a
eitherToMaybe (Left _)  = Nothing
eitherToMaybe (Right x) = Just x

foreignToMaybe :: forall a. (IsForeign a) => Foreign -> Maybe a
foreignToMaybe = eitherToMaybe <<< read