export function openModal(name) {
  this.set(`show${name}`, true);
}

export function closeModal(name) {
  this.set(`show${name}`, false);
}
