import { atom } from 'jotai'

import { CURRENT_SUB_INITIAL_ATOM } from './currentSubAtomConstants'
import { ICurrentSubAtom } from './currentSubAtomTypes'

const currentSubAtom = atom<ICurrentSubAtom>(CURRENT_SUB_INITIAL_ATOM)

export default currentSubAtom
