import {
  BitArray,
  PseudoMersennePrime,
  PseudoMersennePrimeStatic,
  SjclEllipticalPoint,
  TypeHelpers
} from 'sjcl'

declare module 'sjcl' {
  interface BigNumber {
    modulus: BigNumber
    radix: number
    maxMul: number
    copy(): BigNumber
    initWith: TypeHelpers.BigNumberBinaryOperator
    equals(that: BigNumber | number): boolean
    getLimb(index: number): number
    greaterEquals(that: BigNumber | number): boolean
    toString(): string
    addM: TypeHelpers.BigNumberBinaryOperator
    doubleM(): BigNumber
    halveM(): BigNumber
    subM: TypeHelpers.BigNumberBinaryOperator
    mod: TypeHelpers.BigNumberBinaryOperator
    inverseMod: TypeHelpers.BigNumberBinaryOperator
    add: TypeHelpers.BigNumberBinaryOperator
    sub: TypeHelpers.BigNumberBinaryOperator
    mul: TypeHelpers.BigNumberBinaryOperator
    square(): BigNumber
    inverse(): BigNumber
    power(n: BigNumber | number[] | number): BigNumber
    mulmod: TypeHelpers.BigNumberTrinaryOperator
    powermod: TypeHelpers.BigNumberTrinaryOperator
    montpowermod: TypeHelpers.BigNumberTrinaryOperator
    trim(): BigNumber
    reduce(): BigNumber
    fullReduce(): BigNumber
    normalize(): BigNumber
    cnormalize(): BigNumber
    toBits(len?: number): BitArray
    bitLength(): number
  }

  interface SjclEllipticalCurve {
    fromBits(bits: BitArray): SjclEllipticalPoint
    field: PseudoMersennePrimeStatic & { modulus: PseudoMersennePrime }
    r: BigNumber
    a: BigNumber
    b: BigNumber
    x: BigNumber
    y: BigNumber
  }
}
