# Module Documentation

## Module Control.Monad.Knockout

#### `NewObservable`

``` purescript
data NewObservable :: !
```


#### `WriteObservable`

``` purescript
data WriteObservable :: !
```


#### `ReadObservable`

``` purescript
data ReadObservable :: !
```


#### `Observable`

``` purescript
data Observable :: * -> *
```


#### `PureComputed`

``` purescript
data PureComputed :: * -> *
```


#### `newObservable`

``` purescript
newObservable :: forall a eff. Eff (newObservable :: NewObservable | eff) (Observable a)
```


#### `writeObservable`

``` purescript
writeObservable :: forall a eff. Observable a -> a -> Eff (writeObservable :: WriteObservable | eff) Unit
```


#### `readObservable`

``` purescript
readObservable :: forall a eff. (IsForeign a) => Observable a -> Eff (readObservable :: ReadObservable | eff) (Maybe a)
```


#### `pureComputed`

``` purescript
pureComputed :: forall a eff. Eff (readObservable :: ReadObservable) a -> Eff (newObservable :: NewObservable | eff) (PureComputed a)
```


#### `readPureComputed`

``` purescript
readPureComputed :: forall a eff. (IsForeign a) => PureComputed a -> Eff (readObservable :: ReadObservable | eff) a
```