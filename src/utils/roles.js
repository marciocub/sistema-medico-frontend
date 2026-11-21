export const ROLES = {
  ADMIN: 'ADMIN',
  MEDICO: 'MEDICO',
  PACIENTE: 'PACIENTE',
};

export const getHomeRouteByRole = (rol) => {
  switch (rol) {
    case ROLES.ADMIN:
      return '/admin';
    case ROLES.MEDICO:
      return '/dashboard';
    case ROLES.PACIENTE:
      return '/dashboard';
    default:
      return '/login';
  }
};
