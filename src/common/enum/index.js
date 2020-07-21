import { rebuild as rebuildEnums } from './enums';
import common from './common.js';

let enumsContainer = Object.assign({}, common);
rebuildEnums.call(enumsContainer);

export default enumsContainer;
