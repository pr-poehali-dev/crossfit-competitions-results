import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Participant {
  id: number;
  name: string;
  category: string;
  avatar: string;
  wod1_1: { result: string; points: number };
  wod1_2: { result: string; points: number };
  wod2: { result: string; points: number };
  wod3?: { result: string; points: number };
  wod3_1?: { result: string; points: number };
  wod3_2?: { result: string; points: number };
  wod4_1?: { result: string; points: number };
  wod4_2?: { result: string; points: number };
  final: { place: number; points: number };
  totalScore: number;
}



const mockParticipants: Participant[] = [
  // Команды Про
  { id: 1, name: 'Команда 1', category: 'Команды Про', avatar: '🏆', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3_1: { result: '-', points: 0 }, wod3_2: { result: '-', points: 0 }, wod4_1: { result: '-', points: 0 }, wod4_2: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 2, name: 'Команда 2', category: 'Команды Про', avatar: '⚡', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3_1: { result: '-', points: 0 }, wod3_2: { result: '-', points: 0 }, wod4_1: { result: '-', points: 0 }, wod4_2: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  
  // Новички МЖ
  { id: 3, name: 'ПроМёд', category: 'Новички МЖ', avatar: '🍯', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 4, name: 'Force of two', category: 'Новички МЖ', avatar: '⚡', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  { id: 5, name: 'Ёлочный ЕМОМ', category: 'Новички МЖ', avatar: '🎄', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 3, points: 0 }, totalScore: 0 },
  { id: 6, name: 'Белые и красивые', category: 'Новички МЖ', avatar: '❄️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 4, points: 0 }, totalScore: 0 },
  { id: 7, name: 'Любят адреналин, но возможно напиток', category: 'Новички МЖ', avatar: '🥤', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 5, points: 0 }, totalScore: 0 },
  { id: 8, name: 'Стар и млад', category: 'Новички МЖ', avatar: '👴', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 6, points: 0 }, totalScore: 0 },
  { id: 9, name: 'Белоснежка +1', category: 'Новички МЖ', avatar: '👸', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 7, points: 0 }, totalScore: 0 },
  { id: 10, name: 'Маша и медведь', category: 'Новички МЖ', avatar: '🐻', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 8, points: 0 }, totalScore: 0 },
  { id: 11, name: 'Кошки-мышки', category: 'Новички МЖ', avatar: '🐱', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 9, points: 0 }, totalScore: 0 },
  { id: 12, name: 'Битой по зубам', category: 'Новички МЖ', avatar: '🏏', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 10, points: 0 }, totalScore: 0 },
  { id: 13, name: 'Суперы', category: 'Новички МЖ', avatar: '🦸', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 11, points: 0 }, totalScore: 0 },
  { id: 14, name: 'ХМЕЛИСУМЕЛИ', category: 'Новички МЖ', avatar: '🍺', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 12, points: 0 }, totalScore: 0 },
  
  // Новички МЖ+
  { id: 15, name: 'Семейные', category: 'Новички МЖ+', avatar: '👨‍👩‍👧', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 16, name: 'Лило и Стич', category: 'Новички МЖ+', avatar: '🌺', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  { id: 17, name: 'Steel&fire', category: 'Новички МЖ+', avatar: '🔥', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 3, points: 0 }, totalScore: 0 },
  { id: 18, name: 'Одуванчики', category: 'Новички МЖ+', avatar: '🌼', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 4, points: 0 }, totalScore: 0 },
  { id: 19, name: 'Елки ИГО голки', category: 'Новички МЖ+', avatar: '🎄', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 5, points: 0 }, totalScore: 0 },
  { id: 20, name: 'Елочные гладиаторы', category: 'Новички МЖ+', avatar: '⚔️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 6, points: 0 }, totalScore: 0 },
  { id: 21, name: 'НЕЛИШНИЕ КИЛОГРАММЫ', category: 'Новички МЖ+', avatar: '⚖️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 7, points: 0 }, totalScore: 0 },
  { id: 22, name: 'Все еще новички', category: 'Новички МЖ+', avatar: '🆕', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 8, points: 0 }, totalScore: 0 },
  { id: 23, name: 'НикОля', category: 'Новички МЖ+', avatar: '🎅', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 9, points: 0 }, totalScore: 0 },
  { id: 24, name: 'Hoops&Wilde', category: 'Новички МЖ+', avatar: '🏀', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 10, points: 0 }, totalScore: 0 },
  { id: 25, name: 'Можем хуже', category: 'Новички МЖ+', avatar: '🤷', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 11, points: 0 }, totalScore: 0 },
  { id: 26, name: 'Однофамильцы', category: 'Новички МЖ+', avatar: '👥', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 12, points: 0 }, totalScore: 0 },
  { id: 27, name: 'Зов Джунглей', category: 'Новички МЖ+', avatar: '🎯', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 13, points: 0 }, totalScore: 0 },
  { id: 28, name: 'Внуки Деда Мороза', category: 'Новички МЖ+', avatar: '🎅', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 14, points: 0 }, totalScore: 0 },
  { id: 29, name: 'Мутный Енот', category: 'Новички МЖ+', avatar: '🦝', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 15, points: 0 }, totalScore: 0 },
  { id: 30, name: 'Ух ты пухты', category: 'Новички МЖ+', avatar: '🎉', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 16, points: 0 }, totalScore: 0 },
  { id: 31, name: 'Нас заставили', category: 'Новички МЖ+', avatar: '🌟', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 17, points: 0 }, totalScore: 0 },
  { id: 32, name: 'Пухлые утки', category: 'Новички МЖ+', avatar: '🦆', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 18, points: 0 }, totalScore: 0 },
  { id: 33, name: 'Киля', category: 'Новички МЖ+', avatar: '⚓', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 19, points: 0 }, totalScore: 0 },
];

interface HeatWithTeams {
  time: string;
  category: string;
  teams: string[];
}

interface ScheduleEventWithTeams {
  id: number;
  event: string;
  heats: HeatWithTeams[];
  status: 'upcoming' | 'live' | 'completed';
}

const mockSchedule: ScheduleEventWithTeams[] = [
  { 
    id: 0, 
    event: 'Регистрация и брифинг', 
    heats: [
      { 
        time: '08:20 - 08:50', 
        category: 'Регистрация',
        teams: []
      },
      { 
        time: '09:00', 
        category: 'Брифинг 1 комплекс + открытие',
        teams: []
      },
    ],
    status: 'completed' 
  },
  { 
    id: 1, 
    event: 'Комплекс 1 - Запрягаем греблю!', 
    heats: [
      { 
        time: '09:45', 
        category: 'Заход 1',
        teams: [
          'Команда 1 (Команды Про, дорожка 1)',
          'Команда 2 (Команды Про, дорожка 2)'
        ]
      },
      { 
        time: '10:05', 
        category: 'Заход 2',
        teams: [
          '1. Любят адреналин, но возможно напиток (Новички МЖ)',
          '2. Белоснежка +1 (Новички МЖ)',
          '3. Маша и медведь (Новички МЖ)',
          '4. Семейные (Новички МЖ+)',
          '5. Лило и Стич (Новички МЖ+)',
          '6. Ух ты пухты (Новички МЖ+)',
          '7. Одуванчики (Новички МЖ+)',
          '8. Елки ИГО голки (Новички МЖ+)'
        ]
      },
      { 
        time: '10:18', 
        category: 'Заход 3',
        teams: [
          '1. ПроМёд (Новички МЖ)',
          '2. Force of two (Новички МЖ)',
          '3. ХМЕЛИСУМЕЛИ (Новички МЖ)',
          '4. Елочные гладиаторы (Новички МЖ+)',
          '5. НЕЛИШНИЕ КИЛОГРАММЫ (Новички МЖ+)',
          '6. Все еще новички (Новички МЖ+)',
          '7. НикОля (Новички МЖ+)',
          '8. Hoops&Wilde (Новички МЖ+)'
        ]
      },
      { 
        time: '10:30', 
        category: 'Заход 4',
        teams: [
          '1. Кошки-мышки (Новички МЖ)',
          '2. Битой по зубам (Новички МЖ)',
          '3. Ёлочный ЕМОМ (Новички МЖ)',
          '4. Можем хуже (Новички МЖ+)',
          '5. Однофамильцы (Новички МЖ+)',
          '6. Зов Джунглей (Новички МЖ+)',
          '7. Внуки Деда Мороза (Новички МЖ+)',
          '8. Киля (Новички МЖ+)'
        ]
      },
      { 
        time: '10:43', 
        category: 'Заход 5',
        teams: [
          '1. Белые и красивые (Новички МЖ)',
          '2. Суперы (Новички МЖ)',
          '3. Стар и млад (Новички МЖ)',
          '4. Мутный Енот (Новички МЖ+)',
          '5. Steel&fire (Новички МЖ+)',
          '6. Нас заставили (Новички МЖ+)',
          '7. Пухлые утки (Новички МЖ+)'
        ]
      },

    ],
    status: 'completed' 
  },
  { 
    id: 2, 
    event: 'Комплекс 2 - Операция «Двойной Удар»', 
    heats: [
      { 
        time: '11:40', 
        category: 'Заход 1',
        teams: [
          '1. Команда 1 (Команды Про)',
          '2. Команда 2 (Команды Про)'
        ]
      },
      { 
        time: '11:50', 
        category: 'Смена оборудования',
        teams: []
      },
      { 
        time: '12:00', 
        category: 'Заход 2',
        teams: [
          '1. Любят адреналин, но возможно напиток (Новички МЖ)',
          '3. Маша и медведь (Новички МЖ)',
          '4. Семейные (Новички МЖ+)',
          '5. Лило и Стич (Новички МЖ+)',
          '6. Ух ты пухты (Новички МЖ+)',
          '4. Одуванчики (Новички МЖ+)'
        ]
      },
      { 
        time: '12:15', 
        category: 'Заход 3',
        teams: [
          '1. ПроМёд (Новички МЖ)',
          '2. Белоснежка +1 (Новички МЖ)',
          '3. Елки ИГО голки (Новички МЖ+)',
          '5. Елочные гладиаторы (Новички МЖ+)',
          '6. НЕЛИШНИЕ КИЛОГРАММЫ (Новички МЖ+)',
          '4. Все еще новички (Новички МЖ+)'
        ]
      },
      { 
        time: '12:30', 
        category: 'Заход 4',
        teams: [
          '1. Force of two (Новички МЖ)',
          '2. ХМЕЛИСУМЕЛИ (Новички МЖ)',
          '3. НикОля (Новички МЖ+)',
          '4. Hoops&Wilde (Новички МЖ+)',
          '5. Можем хуже (Новички МЖ+)',
          '6. Однофамильцы (Новички МЖ+)'
        ]
      },
      { 
        time: '12:45', 
        category: 'Заход 5',
        teams: [
          '1. Кошки-мышки (Новички МЖ)',
          '2. Битой по зубам (Новички МЖ)',
          '3. Зов Джунглей (Новички МЖ+)',
          '4. Внуки Деда Мороза (Новички МЖ+)',
          '5. Мутный Енот (Новички МЖ+)'
        ]
      },
      { 
        time: '13:00', 
        category: 'Заход 6',
        teams: [
          '1. Ёлочный ЕМОМ (Новички МЖ)',
          '2. Белые и красивые (Новички МЖ)',
          '3. Steel&fire (Новички МЖ+)',
          '4. Нас заставили (Новички МЖ+)'
        ]
      },
      { 
        time: '13:15', 
        category: 'Заход 7',
        teams: [
          '1. Суперы (Новички МЖ)',
          '2. Стар и млад (Новички МЖ)',
          '3. Пухлые утки (Новички МЖ+)',
          '4. Киля (Новички МЖ+)'
        ]
      },
    ],
    status: 'live' 
  },
  { 
    id: 3, 
    event: 'Комплекс 3 - Подарок Империи', 
    heats: [
      { 
        time: '14:15', 
        category: 'Заход 1',
        teams: [
          '1. Команда 1 (Команды Про)',
          '2. Команда 2 (Команды Про)'
        ]
      },
      { 
        time: '14:35', 
        category: 'Заход 2',
        teams: [
          '1. Любят адреналин, но возможно напиток (Новички МЖ)',
          '2. Белоснежка +1 (Новички МЖ)',
          '3. Семейные (Новички МЖ+)',
          '4. Лило и Стич (Новички МЖ+)'
        ]
      },
      { 
        time: '14:45', 
        category: 'Заход 3',
        teams: [
          '1. Маша и медведь (Новички МЖ)',
          '2. ПроМёд (Новички МЖ)',
          '3. Ух ты пухты (Новички МЖ+)',
          '4. Одуванчики (Новички МЖ+)'
        ]
      },
      { 
        time: '14:55', 
        category: 'Заход 4',
        teams: [
          '1. Force of two (Новички МЖ)',
          '2. ХМЕЛИСУМЕЛИ (Новички МЖ)',
          '3. Елки ИГО голки (Новички МЖ+)',
          '4. Елочные гладиаторы (Новички МЖ+)'
        ]
      },
      { 
        time: '15:05', 
        category: 'Заход 5',
        teams: [
          '1. Кошки-мышки (Новички МЖ)',
          '2. Битой по зубам (Новички МЖ)',
          '3. НЕЛИШНИЕ КИЛОГРАММЫ (Новички МЖ+)',
          '4. Все еще новички (Новички МЖ+)'
        ]
      },
      { 
        time: '15:15', 
        category: 'Заход 6',
        teams: [
          '1. Ёлочный ЕМОМ (Новички МЖ)',
          '2. Белые и красивые (Новички МЖ)',
          '3. НикОля (Новички МЖ+)',
          '4. Hoops&Wilde (Новички МЖ+)'
        ]
      },
      { 
        time: '15:25', 
        category: 'Заход 7',
        teams: [
          '1. Суперы (Новички МЖ)',
          '2. Стар и млад (Новички МЖ)',
          '3. Можем хуже (Новички МЖ+)',
          '4. Однофамильцы (Новички МЖ+)'
        ]
      },
      { 
        time: '15:35', 
        category: 'Заход 8',
        teams: [
          '1. Зов Джунглей (Новички МЖ+)',
          '2. Внуки Деда Мороза (Новички МЖ+)',
          '3. Мутный Енот (Новички МЖ+)',
          '4. Steel&fire (Новички МЖ+)'
        ]
      },
      { 
        time: '15:45', 
        category: 'Заход 9',
        teams: [
          '1. Нас заставили (Новички МЖ+)',
          '2. Пухлые утки (Новички МЖ+)',
          '3. Киля (Новички МЖ+)'
        ]
      },
    ],
    status: 'upcoming' 
  },
  { 
    id: 4, 
    event: 'Комплекс 4 - Снайперы в деле', 
    heats: [
      { 
        time: '16:30', 
        category: 'Команды Про',
        teams: [
          '1. Команда 1 (Команды Про)',
          '2. Команда 2 (Команды Про)'
        ]
      },
    ],
    status: 'upcoming' 
  },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Новички МЖ');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);

  const filteredParticipants = mockParticipants
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/86dd6813-c6ff-44a0-b096-65eed9be5cdb.jpeg)' }}>
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        <section className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-sm p-6 md:p-12 text-white animate-fade-in">
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              НОВОГОДНИЙ БЕСПРЕДЕЛ
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto px-4">
              Следи за результатами в реальном времени
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{mockParticipants.length}</div>
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Участников</div>
              </div>
              <div className="h-12 sm:h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{mockSchedule.length}</div>
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Комплексов</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10"></div>
        </section>

        <Tabs defaultValue="results" className="space-y-8 animate-fade-in">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14">
            <TabsTrigger value="results" className="text-sm sm:text-base font-semibold">
              <Icon name="BarChart3" size={18} className="mr-1 sm:mr-2" />
              Результаты
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm sm:text-base font-semibold">
              <Icon name="Calendar" size={18} className="mr-1 sm:mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="workouts" className="text-sm sm:text-base font-semibold">
              <Icon name="Dumbbell" size={18} className="mr-1 sm:mr-2" />
              Комплексы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-center bg-black/40 backdrop-blur-sm rounded-xl p-4">
              <Button 
                variant={selectedCategory === 'Новички МЖ' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Новички МЖ')}
                className="font-semibold"
              >
                Новички МЖ
              </Button>
              <Button 
                variant={selectedCategory === 'Новички МЖ+' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Новички МЖ+')}
              >
                Новички МЖ+
              </Button>
              <Button 
                variant={selectedCategory === 'Команды Про' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Команды Про')}
              >
                Команды Про
              </Button>
            </div>

            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/40">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Место</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Участник</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">1.1</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">1.2</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">2</th>
                        {selectedCategory === 'Команды Про' ? (
                          <>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">3.1</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">3.2</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">4.1</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">4.2</th>
                          </>
                        ) : (
                          <th className="px-4 py-3 text-center text-xs font-bold uppercase">3</th>
                        )}
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">Финал</th>
                        <th className="px-4 py-3 text-right text-xs font-bold uppercase">Итого</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredParticipants.map((participant, index) => (
                        <tr 
                          key={participant.id}
                          className="hover:bg-muted/50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={
                                index === 0 ? 'text-2xl font-extrabold text-yellow-400' :
                                index === 1 ? 'text-xl font-bold text-gray-300' :
                                index === 2 ? 'text-lg font-bold text-orange-400' :
                                'text-lg font-semibold text-white'
                              }>
                                #{index + 1}
                              </div>
                              {index < 3 && (
                                <Icon 
                                  name={index === 0 ? 'Trophy' : index === 1 ? 'Medal' : 'Award'} 
                                  size={20}
                                  className={index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'}
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">{participant.avatar}</div>
                              <div className="font-bold text-base text-white">{participant.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod1_1.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod1_1.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod1_2.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod1_2.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod2.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod2.points})</div>
                          </td>
                          {participant.category === 'Команды Про' ? (
                            <>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod3_1?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod3_1?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod3_2?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod3_2?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod4_1?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod4_1?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod4_2?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod4_2?.points})</div>
                              </td>
                            </>
                          ) : (
                            <td className="px-4 py-3 text-center">
                              <div className="font-semibold">{participant.wod3?.result}</div>
                              <div className="text-xs text-muted-foreground">({participant.wod3?.points})</div>
                            </td>
                          )}
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.final.place} место</div>
                            <div className="text-xs text-muted-foreground">({participant.final.points})</div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-xl font-bold text-primary">{participant.totalScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          <TabsContent value="schedule" className="space-y-4">
            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-white">
                  <Icon name="CalendarDays" size={28} />
                  Расписание заходов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSchedule.map((event, index) => (
                  <div 
                    key={event.id}
                    className="rounded-xl border-2 border-white/20 overflow-hidden animate-slide-in bg-black/40"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="w-full flex items-center gap-6 p-5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex-1 flex items-center gap-6">
                        <div>
                          <h4 className="font-bold text-xl text-left text-white">{event.event}</h4>
                          <p className="text-sm text-white/60 text-left">
                            {event.heats.length} заходов
                          </p>
                        </div>
                      </div>

                      <Icon 
                        name={expandedEvent === event.id ? "ChevronUp" : "ChevronDown"} 
                        size={24}
                        className="text-white/60"
                      />
                    </button>
                    
                    {expandedEvent === event.id && (
                      <div className="border-t border-white/20 bg-white/5 p-4 space-y-3">
                        {event.heats.map((heat, heatIndex) => (
                          <div 
                            key={heatIndex}
                            className="bg-black/40 rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold text-primary min-w-[60px]">
                                {heat.time}
                              </div>
                              <div className="h-10 w-px bg-white/20"></div>
                              <Badge variant="outline" className="font-semibold border-white/40 text-white">
                                {heat.category}
                              </Badge>
                            </div>
                            {heat.teams.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ml-0 sm:ml-20">
                                {heat.teams.map((team, teamIndex) => (
                                  <div 
                                    key={teamIndex}
                                    className="text-sm text-white/80 bg-white/5 px-3 py-2 rounded border border-white/10"
                                  >
                                    {team}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-white">
                  <Icon name="Dumbbell" size={28} />
                  Описание комплексов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* НОВИЧКИ МЖ */}
                <div className="bg-black/40 rounded-xl p-6 border-2 border-yellow-400/40">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                    <Icon name="Flame" size={28} />
                    НОВИЧКИ МЖ
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 1 ? null : 1)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 1</h4>
                            <p className="text-sm text-white/60">Запрягаем греблю!</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 1 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 1 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">ЕМОМ 10 минут (смена атлетов происходит каждую минуту)</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-medium">1-ая минута: А1 - набирает калории на гребле || А2 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 12 становых с гирей + 9 фронтальных приседаний с гирей + 6 маха гири (М 12/Ж 8 кг)</p>
                            <p className="font-medium">2-ая минута: А2 - набирает калории на гребле || А1 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 12 становых с гирей + 9 фронтальных приседаний с гирей + 6 маха гири (М 12/Ж 8 кг)</p>
                            <p className="text-yellow-400 font-semibold mt-3">2 зачета: калорий + повторения</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 2 ? null : 2)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💪</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 2</h4>
                            <p className="text-sm text-white/60">Операция «Двойной Удар»</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 2 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 2 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">8 минут (все делится на двоих) - набрать как можно больше повторений.</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>16 перешагиваний бокса с 1-ой гантелью (15/7) (М 60/Ж 50)</li>
                            <li>16 швунгов гантели</li>
                            <li>4 тележки</li>
                          </ul>
                          <p className="text-white/90 font-semibold mt-3 mb-2">Отдых 1 минута</p>
                          <p className="text-white/90 font-semibold mb-2">4 минуты (все выполняется синхронно) - набрать как можно больше повторений</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>12 перепрыгиваний гантели</li>
                            <li>8 ситапов с медболом (каждый делает 8, вес медбола 4 кг)</li>
                            <li>4 рывок + трастер</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 3 ? null : 3)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 3</h4>
                            <p className="text-sm text-white/60">Подарок Империи</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 3 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 3 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">Крышка 9 минут</p>
                          <p className="text-yellow-400 font-bold mb-2">⚡100 ОП</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">🔵 3 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>12 бросков мяча (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>6 перелезаний друг за другом (стена 100 см) на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 2 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>15 бросков мяча (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>8 перелезаний на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 1 круг</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>18 бросков (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>10 перелезаний на двоих</li>
                            </ul>
                            <p className="text-yellow-400 font-bold mt-2">⚡100 ОП конец</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* НОВИЧКИ МЖ+ */}
                <div className="bg-black/40 rounded-xl p-6 border-2 border-blue-400/40">
                  <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <Icon name="Zap" size={28} />
                    НОВИЧКИ МЖ+
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 4 ? null : 4)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 1</h4>
                            <p className="text-sm text-white/60">Запрягаем греблю!</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 4 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 4 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">ЕМОМ 10 минут (смена атлетов происходит каждую минуту)</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-medium">1-ая минута: А1 - набирает калории на гребле || А2 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 9 становых + 6 взятий с виса штанги + 3 фронт.приседа (М 40/Ж 25 кг)</p>
                            <p className="font-medium">2-ая минута: А2 - набирает калории на гребле || А1 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 9 становых + 6 взятий с виса штанги + 3 фронт.приседа (М 40/Ж 25 кг)</p>
                            <p className="text-blue-400 font-semibold mt-3">2 зачета: калорий + повторения</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 5 ? null : 5)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💪</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 2</h4>
                            <p className="text-sm text-white/60">Операция «Двойной Удар»</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 5 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 5 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">8 минут (все делится на двоих) - набрать как можно больше повторений.</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>16 перешагиваний бокса с 1-ой гантелью (17,5/10) (М 60/Ж 50)</li>
                            <li>16 швунгов гантели</li>
                            <li>4 тележки</li>
                          </ul>
                          <p className="text-white/90 font-semibold mt-3 mb-2">Отдых 1 минута</p>
                          <p className="text-white/90 font-semibold mb-2">4 минуты (все выполняется синхронно) - набрать как можно больше повторений</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>12 перепрыгиваний гантели</li>
                            <li>8 ситапов с медболом (каждый делает 8, вес медбола 6 кг)</li>
                            <li>4 рывок + трастер</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 6 ? null : 6)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 3</h4>
                            <p className="text-sm text-white/60">Подарок Империи</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 6 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 6 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">Крышка 9 минут</p>
                          <p className="text-blue-400 font-bold mb-2">⚡100 ОП</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">🔵 3 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>12 бросков мяча (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>6 перелезаний друг за другом (стена 100 см) на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 2 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>15 бросков мяча (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>8 перелезаний на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 1 круг</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>18 бросков (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>10 перелезаний на двоих</li>
                            </ul>
                            <p className="text-blue-400 font-bold mt-2">⚡100 ОП конец</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* КОМАНДЫ ПРО */}
                <div className="bg-black/40 rounded-xl p-6 border-2 border-red-400/40">
                  <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                    <Icon name="Crown" size={28} />
                    КОМАНДЫ ПРО 🎅🤶
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 7 ? null : 7)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 1</h4>
                            <p className="text-sm text-white/60">Берпи наносят удар</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 7 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 7 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-red-400 font-bold mb-3">Часть 1: Крышка 7 минут (тройка 1 - состав любой)</p>
                          <div className="space-y-2 text-white/80">
                            <p>🔥 3/3 берпи синхрон втроем через бокс (боксы 50 см)</p>
                            <p className="ml-4">А1: 6 выходов</p>
                            <p>🔥 4/4 берпи синхрон втроем через бокс</p>
                            <p className="ml-4">А2: 12 подтягиваний до груди</p>
                            <p>🔥 5/5 берпи через бокс</p>
                            <p className="ml-4">А3: 18 подтягиваний до подбородка</p>
                            <p>🔥 6/6 берпи ч/з бокс</p>
                            <p className="text-yellow-400 font-semibold mt-2">❗❗❗P.S в первой части есть нюанс, который будет озвучен на брифинге</p>
                          </div>
                          
                          <p className="text-white/90 font-semibold mt-4 mb-3">⏱️ 30 секунд отдых</p>
                          
                          <p className="text-red-400 font-bold mb-3">Часть 2: крышка 7 минут (тройка 2 - три человека, которые не участвовали в 1-ой части)</p>
                          <div className="space-y-2 text-white/80">
                            <p>🔥 8 девил пресс + трастер синхрон (20/15)</p>
                            <p className="text-sm ml-4">(руку можно не менять, если тройка из 3-х мужчин, то третья гантель 22.5, если 3 женщины, то третья 17.5)</p>
                            <p className="ml-4">А1: 8 калорий байк</p>
                            <p>🔥 10 девил пресс + трастер синхрон</p>
                            <p className="ml-4">А2: 10 калорий</p>
                            <p>🔥 12 девил пресс + трастер</p>
                            <p className="ml-4">А3: 12 калорий</p>
                            <p>🔥 14 девил пресс + трастер</p>
                            <p className="text-red-400 font-semibold mt-3">Два зачета: 1 части время или повторения / 2 часть время или повторения</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 8 ? null : 8)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💪</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 2</h4>
                            <p className="text-sm text-white/60">Двойной удар</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 8 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 8 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-bold mb-3">6 AMRAP по 2 минуты</p>
                          
                          <div className="space-y-3 text-white/80">
                            <div>
                              <p className="font-bold text-red-400">🔥 Amrap 2 минуты - 1 раунд, 4 раунд</p>
                              <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>5 рывков синхронно (40/25)</li>
                                <li>А1: 5 НКП / А2 висит</li>
                                <li>А2: 5 НКП / А1 висит</li>
                              </ul>
                            </div>
                            
                            <div>
                              <p className="font-bold text-red-400">🔥 Amrap 2 минуты - 2 раунд, 5 раунд</p>
                              <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>А1: 5 становых + 3 взятия с виса + 1 швунг (50/35)</li>
                                <li>А2: удерживает штангу внизу, упираться в бедра нельзя</li>
                                <li>Смена произвольная, но только после того, как атлет выполнил полную связку</li>
                              </ul>
                            </div>
                            
                            <div>
                              <p className="font-bold text-red-400">🔥 Amrap 2 минуты - 3 раунд, 6 раунд</p>
                              <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>А1: набирает калории на гребле</li>
                                <li>А2: набирает перешагивания ч/з бокс с двумя гантелями (одна гантель 20, вторая 15)</li>
                                <li>Смена в любой момент (высота 60/50 см, переворачивают атлеты бокс сами)</li>
                              </ul>
                            </div>
                          </div>
                          
                          <p className="text-red-400 font-semibold mt-3">Зачет 1: сумма всех повторений</p>
                          <p className="text-yellow-400 text-sm mt-2">❗ После своего Amrap двойка обязана дать пятюню следующей паре.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 9 ? null : 9)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 3</h4>
                            <p className="text-sm text-white/60">Звездный путь</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 9 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 9 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-red-400 font-bold mb-3">🔥 Часть 1: АМРАП 8 минут (4-ка)</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">• 80 бросков медбола (9/6)</p>
                            <p className="ml-4 text-sm">А1 бросает / трое других приседают в синхрон / смена в любой момент</p>
                            <p className="mt-2">Дальше до конца 8-ми минут набрать как можно больше кругов синхронно вчетвером</p>
                            <ul className="list-disc list-inside ml-4">
                              <li>4-6-8-10-… Выпады с гирей (24/16)</li>
                              <li>Махи Гири</li>
                            </ul>
                          </div>
                          
                          <div className="my-4 border-t border-dashed border-white/30 pt-3">
                            <p className="text-yellow-400 text-sm font-semibold">⚡ Сразу после 8-ми минут, до конца крышки.</p>
                            <p className="text-yellow-400 text-sm">Старт двойки происходит, только после того, как вся 4-ка вбежала в раму.</p>
                          </div>
                          
                          <p className="text-red-400 font-bold mb-3">🔥 АФАП двойка</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">80 ДП на двоих, может сделать 1</p>
                            <p className="font-semibold">4 круга:</p>
                            <ul className="list-disc list-inside ml-4">
                              <li>А1: 5 заходов на стену / А2: 3 подъем переворотом - работают одновременно</li>
                              <li>5 оверхед приседаний штанга синхронно (40/25)</li>
                              <li>В каждом кругу смена (А2 делает заходы на стену, А1 подъем переворотом)</li>
                            </ul>
                            <p className="font-semibold mt-2">80 ДП на двоих, может сделать 1</p>
                          </div>
                          
                          <p className="text-red-400 font-semibold mt-3">2 зачета: повторения в первой части и общее время</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 10 ? null : 10)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🎁</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 4</h4>
                            <p className="text-sm text-white/60">Снайперы в деле</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 10 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 10 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">Описание комплекса будет объявлено позже</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}