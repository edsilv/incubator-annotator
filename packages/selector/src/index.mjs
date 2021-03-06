/**
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { AsyncTee } from '@annotator/tee';
import reselect from 'reselect';

const _createSelectorCreator = reselect.createSelectorCreator;

const identity = a => a;

export function createSelectorCreator(memoize, ...memoizeOptions) {
  const createSelector = _createSelectorCreator(memoize, ...memoizeOptions);
  return resultFunc => {
    const wrapperFunc = (...args) => {
      const iterable = resultFunc(...args);
      return new AsyncTee(iterable);
    };
    return createSelector(identity, wrapperFunc);
  };
}

export const { defaultMemoize } = reselect;
export const createSelector = createSelectorCreator(defaultMemoize);
