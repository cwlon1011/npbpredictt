import { Team, Pitcher, Batter, DailyMatchup } from '../types';

export const TEAMS: Team[] = [
  // Central League
  {
    id: 'giants',
    name: '讀賣巨人',
    league: 'Central',
    city: '東京',
    stadium: '東京巨蛋',
    stats: { 
      wins: 14, losses: 8, draws: 1, winRate: 0.636, avgRuns: 4.1, era: 2.90,
      homeRecord: { wins: 9, losses: 3 },
      awayRecord: { wins: 5, losses: 5 },
      stadiumPerformance: { '東京巨蛋': 0.750, '阪神甲子園球場': 0.500, '橫濱球場': 0.600, '名古屋巨蛋': 0.400 }
    }
  },
  {
    id: 'tigers',
    name: '阪神虎',
    league: 'Central',
    city: '西宮',
    stadium: '阪神甲子園球場',
    stats: { 
      wins: 13, losses: 9, draws: 1, winRate: 0.591, avgRuns: 3.6, era: 2.75,
      homeRecord: { wins: 8, losses: 4 },
      awayRecord: { wins: 5, losses: 5 },
      stadiumPerformance: { '阪神甲子園球場': 0.667, '東京巨蛋': 0.450, '明治神宮棒球場': 0.700, '廣島MAZDA': 0.550 }
    }
  },
  {
    id: 'baystars',
    name: '橫濱DeNA海灣之星',
    league: 'Central',
    city: '橫濱',
    stadium: '橫濱球場',
    stats: { 
      wins: 11, losses: 10, draws: 0, winRate: 0.524, avgRuns: 4.3, era: 3.40,
      homeRecord: { wins: 6, losses: 5 },
      awayRecord: { wins: 5, losses: 5 },
      stadiumPerformance: { '橫濱球場': 0.545, '東京巨蛋': 0.400, '名古屋巨蛋': 0.500 }
    }
  },
  {
    id: 'carp',
    name: '廣島東洋鯉魚',
    league: 'Central',
    city: '廣島',
    stadium: 'MAZDA Zoom-Zoom 體育場',
    stats: { 
      wins: 10, losses: 12, draws: 1, winRate: 0.455, avgRuns: 3.4, era: 3.10,
      homeRecord: { wins: 6, losses: 6 },
      awayRecord: { wins: 4, losses: 6 },
      stadiumPerformance: { 'MAZDA Zoom-Zoom 體育場': 0.500, '阪神甲子園球場': 0.400, '橫濱球場': 0.350 }
    }
  },
  {
    id: 'swallows',
    name: '東京養樂多燕子',
    league: 'Central',
    city: '東京',
    stadium: '明治神宮棒球場',
    stats: { 
      wins: 9, losses: 13, draws: 1, winRate: 0.409, avgRuns: 3.8, era: 4.05,
      homeRecord: { wins: 4, losses: 7 },
      awayRecord: { wins: 5, losses: 6 },
      stadiumPerformance: { '明治神宮棒球場': 0.364, '橫濱球場': 0.600, '東京巨蛋': 0.450 }
    }
  },
  {
    id: 'dragons',
    name: '中日龍',
    league: 'Central',
    city: '名古屋',
    stadium: '名古屋巨蛋',
    stats: { 
      wins: 8, losses: 13, draws: 2, winRate: 0.381, avgRuns: 2.5, era: 2.80,
      homeRecord: { wins: 5, losses: 7 },
      awayRecord: { wins: 3, losses: 6 },
      stadiumPerformance: { '名古屋巨蛋': 0.417, '東京巨蛋': 0.300, '阪神甲子園球場': 0.350 }
    }
  },
  // Pacific League
  {
    id: 'fighters',
    name: '北海道日本火腿鬥士',
    league: 'Pacific',
    city: '北廣島',
    stadium: 'ES CON FIELD HOKKAIDO',
    stats: { 
      wins: 15, losses: 7, draws: 1, winRate: 0.682, avgRuns: 4.2, era: 3.15,
      homeRecord: { wins: 10, losses: 2 },
      awayRecord: { wins: 5, losses: 5 },
      stadiumPerformance: { 'ES CON FIELD HOKKAIDO': 0.833, '京瓷巨蛋大阪': 0.500, '瑞穗PayPay巨蛋福岡': 0.550 }
    }
  },
  {
    id: 'hawks',
    name: '福岡軟銀鷹',
    league: 'Pacific',
    city: '福岡',
    stadium: '瑞穗PayPay巨蛋福岡',
    stats: { 
      wins: 14, losses: 8, draws: 0, winRate: 0.636, avgRuns: 4.6, era: 3.30,
      homeRecord: { wins: 8, losses: 3 },
      awayRecord: { wins: 6, losses: 5 },
      stadiumPerformance: { '瑞穗PayPay巨蛋福岡': 0.727, 'ZOZO海洋球場': 0.500, '樂天行動公園宮城': 0.650 }
    }
  },
  {
    id: 'marines',
    name: '千葉羅德海洋',
    league: 'Pacific',
    city: '千葉',
    stadium: 'ZOZO海洋球場',
    stats: { 
      wins: 12, losses: 10, draws: 1, winRate: 0.545, avgRuns: 3.8, era: 3.25,
      homeRecord: { wins: 7, losses: 5 },
      awayRecord: { wins: 5, losses: 5 },
      stadiumPerformance: { 'ZOZO海洋球場': 0.583, 'Belluna巨蛋': 0.600, 'ES CON FIELD HOKKAIDO': 0.450 }
    }
  },
  {
    id: 'buffaloes',
    name: '歐力士猛牛',
    league: 'Pacific',
    city: '大阪',
    stadium: '京瓷巨蛋大阪',
    stats: { 
      wins: 10, losses: 11, draws: 1, winRate: 0.476, avgRuns: 3.5, era: 2.85,
      homeRecord: { wins: 6, losses: 5 },
      awayRecord: { wins: 4, losses: 6 },
      stadiumPerformance: { '京瓷巨蛋大阪': 0.545, '瑞穗PayPay巨蛋福岡': 0.400, 'ZOZO海洋球場': 0.500 }
    }
  },
  {
    id: 'eagles',
    name: '東北樂天金鷲',
    league: 'Pacific',
    city: '仙台',
    stadium: '樂天行動公園宮城',
    stats: { 
      wins: 8, losses: 14, draws: 1, winRate: 0.364, avgRuns: 3.3, era: 3.75,
      homeRecord: { wins: 4, losses: 8 },
      awayRecord: { wins: 4, losses: 6 },
      stadiumPerformance: { '樂天行動公園宮城': 0.333, 'ES CON FIELD HOKKAIDO': 0.500, '瑞穗PayPay巨蛋福岡': 0.400 }
    }
  },
  {
    id: 'lions',
    name: '埼玉西武獅',
    league: 'Pacific',
    city: '所澤',
    stadium: 'Belluna巨蛋',
    stats: { 
      wins: 6, losses: 16, draws: 1, winRate: 0.273, avgRuns: 2.9, era: 3.65,
      homeRecord: { wins: 3, losses: 9 },
      awayRecord: { wins: 3, losses: 7 },
      stadiumPerformance: { 'Belluna巨蛋': 0.250, 'ZOZO海洋球場': 0.400, '京瓷巨蛋大阪': 0.300 }
    }
  }
];

export const SAMPLE_PITCHERS: Pitcher[] = [
  // Giants
  { id: 'p1', name: '菅野 智之', teamId: 'giants', hand: 'Right', era: 2.15, wins: 3, losses: 0, strikeouts: 25, whip: 0.95 },
  { id: 'p12', name: '戶鄉 翔征', teamId: 'giants', hand: 'Right', era: 2.50, wins: 2, losses: 1, strikeouts: 32, whip: 1.05 },
  { id: 'p25', name: '山崎 伊織', teamId: 'giants', hand: 'Right', era: 2.75, wins: 2, losses: 2, strikeouts: 22, whip: 1.12 },
  { id: 'p26', name: 'Foster Griffin', teamId: 'giants', hand: 'Left', era: 2.95, wins: 2, losses: 1, strikeouts: 28, whip: 1.18 },
  { id: 'p27', name: '井上 溫大', teamId: 'giants', hand: 'Left', era: 3.45, wins: 1, losses: 2, strikeouts: 20, whip: 1.25 },

  // Tigers
  { id: 'p2', name: '村上 頌樹', teamId: 'tigers', hand: 'Right', era: 1.95, wins: 2, losses: 1, strikeouts: 28, whip: 0.88 },
  { id: 'p13', name: '才木 浩人', teamId: 'tigers', hand: 'Right', era: 2.10, wins: 3, losses: 0, strikeouts: 35, whip: 1.02 },
  { id: 'p28', name: '大竹 耕太郎', teamId: 'tigers', hand: 'Left', era: 2.65, wins: 2, losses: 2, strikeouts: 21, whip: 1.05 },
  { id: 'p29', name: '伊藤 將司', teamId: 'tigers', hand: 'Left', era: 3.10, wins: 1, losses: 3, strikeouts: 18, whip: 1.15 },
  { id: 'p30', name: 'Jeremy Beasley', teamId: 'tigers', hand: 'Right', era: 2.45, wins: 2, losses: 1, strikeouts: 24, whip: 1.08 },

  // BayStars
  { id: 'p3', name: '東 克樹', teamId: 'baystars', hand: 'Left', era: 2.45, wins: 4, losses: 0, strikeouts: 25, whip: 1.03 },
  { id: 'p31', name: 'Anthony Kay', teamId: 'baystars', hand: 'Left', era: 3.20, wins: 2, losses: 2, strikeouts: 29, whip: 1.22 },
  { id: 'p32', name: 'Andre Jackson', teamId: 'baystars', hand: 'Right', era: 3.55, wins: 2, losses: 3, strikeouts: 31, whip: 1.30 },
  { id: 'p33', name: '大貫 晉一', teamId: 'baystars', hand: 'Right', era: 3.15, wins: 1, losses: 2, strikeouts: 22, whip: 1.18 },
  { id: 'p34', name: '濱口 遙大', teamId: 'baystars', hand: 'Left', era: 4.10, wins: 1, losses: 2, strikeouts: 18, whip: 1.45 },

  // Carp
  { id: 'p35', name: '九里 亞蓮', teamId: 'carp', hand: 'Right', era: 2.85, wins: 2, losses: 3, strikeouts: 26, whip: 1.15 },
  { id: 'p36', name: '大瀨良 大地', teamId: 'carp', hand: 'Right', era: 2.35, wins: 2, losses: 2, strikeouts: 21, whip: 1.02 },
  { id: 'p37', name: '床田 寬樹', teamId: 'carp', hand: 'Left', era: 2.10, wins: 3, losses: 1, strikeouts: 28, whip: 0.98 },
  { id: 'p38', name: '森下 暢仁', teamId: 'carp', hand: 'Right', era: 2.55, wins: 2, losses: 2, strikeouts: 30, whip: 1.10 },
  { id: 'p39', name: 'Thomas Hatch', teamId: 'carp', hand: 'Right', era: 4.25, wins: 1, losses: 3, strikeouts: 22, whip: 1.35 },

  // Swallows
  { id: 'p40', name: '小川 泰弘', teamId: 'swallows', hand: 'Right', era: 3.75, wins: 2, losses: 2, strikeouts: 24, whip: 1.28 },
  { id: 'p41', name: 'Cy Sneed', teamId: 'swallows', hand: 'Right', era: 3.95, wins: 2, losses: 3, strikeouts: 27, whip: 1.32 },
  { id: 'p42', name: 'Miguel Yajure', teamId: 'swallows', hand: 'Right', era: 3.40, wins: 3, losses: 2, strikeouts: 29, whip: 1.25 },
  { id: 'p43', name: '吉村 貢司郎', teamId: 'swallows', hand: 'Right', era: 3.25, wins: 1, losses: 3, strikeouts: 31, whip: 1.15 },
  { id: 'p44', name: '高橋 奎二', teamId: 'swallows', hand: 'Left', era: 4.50, wins: 1, losses: 2, strikeouts: 25, whip: 1.48 },

  // Dragons
  { id: 'p45', name: '柳 裕也', teamId: 'dragons', hand: 'Right', era: 2.15, wins: 2, losses: 2, strikeouts: 29, whip: 1.02 },
  { id: 'p46', name: '高橋 宏斗', teamId: 'dragons', hand: 'Right', era: 1.85, wins: 2, losses: 1, strikeouts: 35, whip: 0.95 },
  { id: 'p47', name: '小笠原 慎之介', teamId: 'dragons', hand: 'Left', era: 2.50, wins: 2, losses: 3, strikeouts: 28, whip: 1.12 },
  { id: 'p48', name: '涌井 秀章', teamId: 'dragons', hand: 'Right', era: 3.20, wins: 1, losses: 4, strikeouts: 20, whip: 1.20 },
  { id: 'p49', name: 'Umberto Mejia', teamId: 'dragons', hand: 'Right', era: 3.45, wins: 1, losses: 2, strikeouts: 22, whip: 1.25 },

  // Fighters
  { id: 'p18', name: '伊藤 大海', teamId: 'fighters', hand: 'Right', era: 1.85, wins: 4, losses: 0, strikeouts: 38, whip: 0.92 },
  { id: 'p19', name: '山崎 福也', teamId: 'fighters', hand: 'Left', era: 2.65, wins: 3, losses: 1, strikeouts: 25, whip: 1.15 },
  { id: 'p50', name: '加藤 貴之', teamId: 'fighters', hand: 'Left', era: 2.30, wins: 3, losses: 2, strikeouts: 21, whip: 0.98 },
  { id: 'p51', name: '河野 龍生', teamId: 'fighters', hand: 'Left', era: 3.15, wins: 2, losses: 2, strikeouts: 20, whip: 1.12 },
  { id: 'p52', name: '上原 健太', teamId: 'fighters', hand: 'Left', era: 3.85, wins: 2, losses: 2, strikeouts: 24, whip: 1.30 },

  // Hawks
  { id: 'p6', name: '有原 航平', teamId: 'hawks', hand: 'Right', era: 2.40, wins: 3, losses: 1, strikeouts: 26, whip: 1.08 },
  { id: 'p53', name: 'Livan Moinelo', teamId: 'hawks', hand: 'Left', era: 1.95, wins: 3, losses: 1, strikeouts: 35, whip: 0.85 },
  { id: 'p54', name: 'Carter Stewart Jr.', teamId: 'hawks', hand: 'Right', era: 3.10, wins: 2, losses: 2, strikeouts: 33, whip: 1.25 },
  { id: 'p55', name: '大津 亮介', teamId: 'hawks', hand: 'Right', era: 2.75, wins: 3, losses: 1, strikeouts: 24, whip: 1.02 },
  { id: 'p56', name: '和田 毅', teamId: 'hawks', hand: 'Left', era: 3.50, wins: 2, losses: 2, strikeouts: 18, whip: 1.22 },

  // Marines
  { id: 'p5', name: '佐佐木 朗希', teamId: 'marines', hand: 'Right', era: 1.55, wins: 2, losses: 0, strikeouts: 45, whip: 0.72 },
  { id: 'p57', name: '小島 和哉', teamId: 'marines', hand: 'Left', era: 2.85, wins: 3, losses: 2, strikeouts: 28, whip: 1.15 },
  { id: 'p58', name: '種市 篤暉', teamId: 'marines', hand: 'Right', era: 2.45, wins: 3, losses: 2, strikeouts: 36, whip: 1.08 },
  { id: 'p59', name: 'C.C. Mercedes', teamId: 'marines', hand: 'Left', era: 3.10, wins: 2, losses: 3, strikeouts: 24, whip: 1.22 },
  { id: 'p60', name: '西野 勇士', teamId: 'marines', hand: 'Right', era: 3.40, wins: 2, losses: 2, strikeouts: 20, whip: 1.18 },

  // Buffaloes
  { id: 'p4', name: '宮城 大彌', teamId: 'buffaloes', hand: 'Left', era: 2.10, wins: 2, losses: 1, strikeouts: 30, whip: 0.98 },
  { id: 'p61', name: '山下 舜平大', teamId: 'buffaloes', hand: 'Right', era: 2.65, wins: 2, losses: 2, strikeouts: 33, whip: 1.15 },
  { id: 'p62', name: '東 晃平', teamId: 'buffaloes', hand: 'Right', era: 2.95, wins: 2, losses: 2, strikeouts: 25, whip: 1.12 },
  { id: 'p63', name: 'Anderson Espinoza', teamId: 'buffaloes', hand: 'Right', era: 2.40, wins: 2, losses: 3, strikeouts: 31, whip: 1.05 },
  { id: 'p64', name: '田嶋 大樹', teamId: 'buffaloes', hand: 'Left', era: 3.55, wins: 1, losses: 2, strikeouts: 22, whip: 1.28 },

  // Eagles
  { id: 'p65', name: '早川 隆久', teamId: 'eagles', hand: 'Left', era: 2.85, wins: 2, losses: 3, strikeouts: 29, whip: 1.18 },
  { id: 'p66', name: '則本 昂大', teamId: 'eagles', hand: 'Right', era: 3.10, wins: 2, losses: 3, strikeouts: 26, whip: 1.22 },
  { id: 'p67', name: '岸 孝之', teamId: 'eagles', hand: 'Right', era: 3.65, wins: 1, losses: 4, strikeouts: 21, whip: 1.30 },
  { id: 'p68', name: '藤井 聖', teamId: 'eagles', hand: 'Left', era: 3.45, wins: 2, losses: 2, strikeouts: 23, whip: 1.25 },
  { id: 'p69', name: 'Cody Ponce', teamId: 'eagles', hand: 'Right', era: 4.10, wins: 1, losses: 3, strikeouts: 25, whip: 1.42 },

  // Lions
  { id: 'p70', name: '今井 達也', teamId: 'lions', hand: 'Right', era: 2.45, wins: 2, losses: 3, strikeouts: 35, whip: 1.12 },
  { id: 'p71', name: '高橋 光成', teamId: 'lions', hand: 'Right', era: 2.95, wins: 1, losses: 4, strikeouts: 28, whip: 1.20 },
  { id: 'p72', name: '平良 海馬', teamId: 'lions', hand: 'Right', era: 2.25, wins: 2, losses: 2, strikeouts: 32, whip: 1.05 },
  { id: 'p73', name: '隅田 知一郎', teamId: 'lions', hand: 'Left', era: 3.15, wins: 1, losses: 4, strikeouts: 30, whip: 1.25 },
  { id: 'p74', name: '松本 航', teamId: 'lions', hand: 'Right', era: 4.55, wins: 0, losses: 3, strikeouts: 20, whip: 1.55 }
];

export const SAMPLE_BATTERS: Batter[] = [
  // Giants
  { id: 'b1', name: '岡本 和真', teamId: 'giants', avg: 0.282, hr: 25, rbi: 65, ops: 0.902 },
  { id: 'b7', name: '坂本 勇人', teamId: 'giants', avg: 0.265, hr: 12, rbi: 45, ops: 0.785 },
  { id: 'b8', name: '丸 佳浩', teamId: 'giants', avg: 0.255, hr: 15, rbi: 40, ops: 0.810 },
  
  // Tigers
  { id: 'b2', name: '佐藤 輝明', teamId: 'tigers', avg: 0.255, hr: 18, rbi: 58, ops: 0.812 },
  { id: 'b9', name: '近本 光司', teamId: 'tigers', avg: 0.295, hr: 5, rbi: 30, ops: 0.820 },
  { id: 'b10', name: '大山 悠輔', teamId: 'tigers', avg: 0.270, hr: 20, rbi: 68, ops: 0.855 },

  // BayStars
  { id: 'b3', name: '牧 秀悟', teamId: 'baystars', avg: 0.302, hr: 22, rbi: 75, ops: 0.885 },
  { id: 'b11', name: '佐野 惠太', teamId: 'baystars', avg: 0.285, hr: 12, rbi: 48, ops: 0.815 },
  { id: 'b12', name: 'Tyler Austin', teamId: 'baystars', avg: 0.310, hr: 28, rbi: 85, ops: 0.995 },

  // Hawks
  { id: 'b5', name: '近藤 健介', teamId: 'hawks', avg: 0.315, hr: 20, rbi: 70, ops: 0.985 },
  { id: 'b6', name: '柳田 悠岐', teamId: 'hawks', avg: 0.295, hr: 15, rbi: 55, ops: 0.865 },
  { id: 'b13', name: '山川 穗高', teamId: 'hawks', avg: 0.260, hr: 26, rbi: 78, ops: 0.895 },

  // Buffaloes
  { id: 'b4', name: '頓宮 裕真', teamId: 'buffaloes', avg: 0.307, hr: 12, rbi: 45, ops: 0.845 },
  { id: 'b14', name: '杉本 裕太郎', teamId: 'buffaloes', avg: 0.245, hr: 18, rbi: 52, ops: 0.795 },
  { id: 'b15', name: '紅林 弘太郎', teamId: 'buffaloes', avg: 0.275, hr: 8, rbi: 42, ops: 0.750 }
];

export const DAILY_SCHEDULE: DailyMatchup[] = [
  { id: 'g1', homeTeamId: 'giants', awayTeamId: 'tigers', homePitcherId: 'p1', awayPitcherId: 'p2', time: '18:00', stadium: '東京巨蛋' },
  { id: 'g2', homeTeamId: 'baystars', awayTeamId: 'swallows', homePitcherId: 'p3', awayPitcherId: 'p40', time: '17:30', stadium: '橫濱球場' },
  { id: 'g3', homeTeamId: 'dragons', awayTeamId: 'carp', homePitcherId: 'p45', awayPitcherId: 'p35', time: '18:00', stadium: '名古屋巨蛋' },
  { id: 'g4', homeTeamId: 'hawks', awayTeamId: 'marines', homePitcherId: 'p6', awayPitcherId: 'p5', time: '18:00', stadium: '瑞穗PayPay巨蛋福岡' },
  { id: 'g5', homeTeamId: 'fighters', awayTeamId: 'buffaloes', homePitcherId: 'p18', awayPitcherId: 'p4', time: '18:00', stadium: 'ES CON FIELD HOKKAIDO' },
  { id: 'g6', homeTeamId: 'eagles', awayTeamId: 'lions', homePitcherId: 'p65', awayPitcherId: 'p70', time: '18:00', stadium: '樂天行動公園宮城' }
];
