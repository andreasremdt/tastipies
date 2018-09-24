export const isActiveNavLink = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : null;
};
