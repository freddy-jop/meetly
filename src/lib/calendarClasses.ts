export const calendarClasses = {
  month: 'w-full',
  caption: 'flex justify-between items-center text-xl font-bold text-gray-800 mb-4',
  nav_button: 'text-indigo-500 hover:text-indigo-500 transition-colors',
  table: 'w-full border-separate border-spacing-2',
  head_row: 'text-center text-sm text-gray-500 font-medium',
  head_cell: 'text-center text-gray-600 text-sm font-medium',
  row: 'flex w-full justify-between',
  cell: 'w-full aspect-square flex items-center justify-center p-2 rounded-md hover:bg-blue-50 transition',
  day: 'w-20 h-15 p-4',
  available: 'font-bold text-blue-600 rounded-full hover:bg-gray-100 transition', // Jours disponibles en bleu
  selected: 'text-white font-semibold bg-blue-600 rounded-full', // Date sélectionnée en bleu plein
  today: 'text-red-500 font-bold', // Aujourd'hui en rouge
  weekend: 'text-indigo-600', // Weekend en gris
  disabled: 'text-gray-800', // bloqué les disponibilité des dates passées
};
