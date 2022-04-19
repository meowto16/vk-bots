import {
  AKIO_BIRTHDAY,
  AKIO_DANG,
  AKIO_NERD, 
  AKIO_OMAEWA,
  AKIO_STRONG,
  AKIO_TAPPING,
  AKIO_WAITING,
  AKIO_BATTLE,
} from '../../../core/constants/stickers.js'

export const SCORE_CONGRATULATIONS = {
  1: {
    message: 'Поздравим $USER$ с первой нексией!',
    sticker: AKIO_BIRTHDAY,
  },
  10: {
    message: 'Ого! Кажется у $USER$ уже целых 10 нексий!',
    sticker: AKIO_NERD,
  },
  20: {
    message: 'Черт! $USER$ играет по крупному. Уже 20 нексий!',
    sticker: AKIO_DANG,
  },
  50: {
    message: 'Узбеки боялись $USER$. Найдет все нексии города... Уже 50 нексий!',
    sticker: AKIO_STRONG,
  },
  100: {
    message: 'Никто и подумать не мог, что $USER$ может вытворить... Уже 100 нексий!',
    sticker: AKIO_TAPPING,
  },
  200: {
    message: 'Это уже не шутки.. Прекращай, $USER$.. Уже 200 нексий!',
    sticker: AKIO_WAITING,
  },
  500: {
    message: 'Кажется $USER$ знает уже все нексии этой страны.. Уже 500 нексий!',
    sticker: AKIO_OMAEWA,
  },
  1000: {
    message: 'Конец игры. $USER$ выигрывает этот неимоверно странный челлендж. Ровно 1000 нексий!',
    sticker: AKIO_BATTLE,
  },
}