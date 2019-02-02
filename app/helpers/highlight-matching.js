import { htmlSafe } from '@ember/string';
import { helper } from '@ember/component/helper';

export function highlightMatching([term, string]/*, hash*/) {
  const regex = new RegExp(term, 'g');
  return htmlSafe(string.replace(regex, `<span class="highlight-text">${term}</span>`));
}

export default helper(highlightMatching);
