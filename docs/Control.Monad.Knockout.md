# Module Documentation

## Module Control.Monad.Knockout

#### `NewObservable`

``` purescript
data NewObservable :: !
```

The effect type for creating an observable.

#### `WriteObservable`

``` purescript
data WriteObservable :: !
```

The effect type for writing to an observable.

#### `ReadObservable`

``` purescript
data ReadObservable :: !
```

The effect type for reading from an observable.

#### `Observable`

``` purescript
data Observable :: * -> *
```

`Observable a` is the type of writable observable values of type `a`.

#### `PureComputed`

``` purescript
data PureComputed :: * -> *
```

`PureComputed a` is the type of pure computed observable values of type `a`.

#### `newObservable`

``` purescript
newObservable :: forall a eff. Eff (newObservable :: NewObservable | eff) (Observable a)
```

Creates a new writable observable.

#### `writeObservable`

``` purescript
writeObservable :: forall a eff. Observable a -> a -> Eff (writeObservable :: WriteObservable | eff) Unit
```

Sets the value of a writable observable.

#### `readObservable`

``` purescript
readObservable :: forall a eff. (IsForeign a) => Observable a -> Eff (readObservable :: ReadObservable | eff) (Maybe a)
```

Reads the value from a writable observable. The result is wrapped into `Maybe`, because the value could have been set to the wrong type from the outside.

#### `pureComputed`

``` purescript
pureComputed :: forall a eff. Eff (readObservable :: ReadObservable) a -> Eff (newObservable :: NewObservable | eff) (PureComputed a)
```

Creates a new pure computed observable. The computation defining the observable is allowed to read the values of other observables.

#### `readPureComputed`

``` purescript
readPureComputed :: forall a eff. (IsForeign a) => PureComputed a -> Eff (readObservable :: ReadObservable | eff) a
```

Reads the value of a pure computed observable. In contrast to *writable* observables,
this value can not have been corrupted from the outside, so it does not have to be wrapped into `Maybe`.