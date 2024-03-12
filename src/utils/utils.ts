export const firstLetterToUpperCase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};



export const colorVariants: Record<string, string> = {
  'bug': 'bg-[#aedf78]',
  'water': 'bg-[#43ccff]',
  'grass': 'bg-[#00ca91]',
  'fire': 'bg-[#e95c4d]',
  'fighting': 'bg-[#e95c4d]',
  'normal': 'bg-[#a5a5a5]',
  'electric': 'bg-[#F7D02C]',
  'ice': 'bg-[#96D9D6]',
  'poison': 'bg-[#A33EA1]',
  'ground': 'bg-[#E2BF65]',
  'flying': 'bg-[#A98FF3]',
  'psychic': 'bg-[#F95587]',
  'rock': 'bg-[#B6A136]',
  'ghost': 'bg-[#735797]',
  'dragon': 'bg-[#6F35FC]',
  'dark': 'bg-[#705746]',
  'steel': 'bg-[#B7B7CE]',
  'fairy': 'bg-[#D685AD]',
}
export const shadowVariants: Record<string, string> = {
  'bug': 'shadow-[#aedf78]',
  'water': 'shadow-[#43ccff]',
  'grass': 'shadow-[#00ca91]',
  'fire': 'shadow-[#e95c4d]',
  'normal': 'shadow-[#a5a5a5]',
  'electric': 'shadow-[#F7D02C]',
  'fighting': 'shadow-[#e95c4d]',
  'ice': 'shadow-[#96D9D6]',
  'poison': 'shadow-[#A33EA1]',
  'ground': 'shadow-[#E2BF65]',
  'flying': 'shadow-[#A98FF3]',
  'psychic': 'shadow-[#F95587]',
  'rock': 'shadow-[#B6A136]',
  'ghost': 'shadow-[#735797]',
  'dragon': 'shadow-[#6F35FC]',
  'dark': 'shadow-[#705746]',
  'steel': 'shadow-[#B7B7CE]',
  'fairy': 'shadow-[#D685AD]',
}