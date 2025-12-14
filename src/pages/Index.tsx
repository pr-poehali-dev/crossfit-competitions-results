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
  members?: string[];
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
  { id: 1, name: 'Жертвы кроссфита', category: 'Команды Про', avatar: '🏆', members: ['Шилин Всеволод', 'Смирнов Иван', 'Кузьминцев Михаил', 'Феофанова Ярослава', 'Остапенко Динара', 'Иванова Татьяна'], wod1_1: { result: '5:23 (72 повт)', points: 2 }, wod1_2: { result: '6:36 (68 повт)', points: 1 }, wod2: { result: '396 повт', points: 1 }, wod3_1: { result: '116 повт', points: 2 }, wod3_2: { result: '14:55 (212 повт)', points: 1 }, wod4_1: { result: '5:36', points: 1 }, wod4_2: { result: '142 повт', points: 2 }, final: { place: 1, points: 10 }, totalScore: 10 },
  { id: 2, name: 'Синий трактор', category: 'Команды Про', avatar: '⚡', members: ['Смирнов Павел', 'Басаев Дмитрий', 'Крылов Виктор', 'Васильева Алена', 'Разумихина Светлана', 'Филиппова Екатерина'], wod1_1: { result: '4:27 (72 повт)', points: 1 }, wod1_2: { result: '6:45 (68 повт)', points: 2 }, wod2: { result: '395 повт', points: 2 }, wod3_1: { result: '119 повт', points: 1 }, wod3_2: { result: '15:00 (212 повт)', points: 2 }, wod4_1: { result: '6:11', points: 2 }, wod4_2: { result: '152 повт', points: 1 }, final: { place: 2, points: 11 }, totalScore: 11 },
  
  // Новички МЖ
  { id: 35, name: 'Ёлочный ЕМОМ', category: 'Новички МЖ', avatar: '🎄', members: ['Пивунов Никита', 'Боруцкая Анна'], wod1_1: { result: '137 кал', points: 90 }, wod1_2: { result: '272 повт', points: 95 }, wod2: { result: '326 повт', points: 85 }, wod3_1: { result: '5:59 (328 повт)', points: 100 }, wod3_2: { result: '', points: 0 }, final: { place: 1, points: 370 }, totalScore: 370 },
  { id: 36, name: 'Белые и красивые', category: 'Новички МЖ', avatar: '❄️', members: ['Воробьев Кирилл', 'Рогожина Анна'], wod1_1: { result: '144 кал', points: 95 }, wod1_2: { result: '263 повт', points: 85 }, wod2: { result: '353 повт', points: 100 }, wod3_1: { result: '7:24 (328 повт)', points: 85 }, wod3_2: { result: '', points: 0 }, final: { place: 2, points: 365 }, totalScore: 365 },
  { id: 34, name: 'Force of two', category: 'Новички МЖ', avatar: '⚡', members: ['Дьячков Иван', 'Стародубцева Инна'], wod1_1: { result: '150 кал', points: 100 }, wod1_2: { result: '216 повт', points: 55 }, wod2: { result: '335 повт', points: 90 }, wod3_1: { result: '6:59 (328 повт)', points: 95 }, wod3_2: { result: '', points: 0 }, final: { place: 3, points: 340 }, totalScore: 340 },
  { id: 313, name: 'Суперы (ударение на У)', category: 'Новички МЖ', avatar: '🦸', members: ['Шмелев Павел', 'Стародумова Анна'], wod1_1: { result: '136 кал', points: 85 }, wod1_2: { result: '268 повт', points: 90 }, wod2: { result: '343 повт', points: 95 }, wod3_1: { result: '8:25 (328 повт)', points: 65 }, wod3_2: { result: '', points: 0 }, final: { place: 4, points: 335 }, totalScore: 335 },
  { id: 37, name: 'Любят адреналин, но возможно напиток', category: 'Новички МЖ', avatar: '🥤', members: ['Купреев Кирилл', 'Ляпунова Юлия'], wod1_1: { result: '118 кал', points: 60 }, wod1_2: { result: '305 повт', points: 100 }, wod2: { result: '322 повт', points: 80 }, wod3_1: { result: '8:06 (328 повт)', points: 70 }, wod3_2: { result: '', points: 0 }, final: { place: 5, points: 310 }, totalScore: 310 },
  { id: 38, name: 'Стар и млад', category: 'Новички МЖ', avatar: '👴', members: ['Смирнов Константин', 'Смирнова Анна'], wod1_1: { result: '127 кал', points: 70 }, wod1_2: { result: '243 повт', points: 80 }, wod2: { result: '321 повт', points: 75 }, wod3_1: { result: '7:53 (328 повт)', points: 75 }, wod3_2: { result: '', points: 0 }, final: { place: 6, points: 300 }, totalScore: 300 },
  { id: 311, name: 'Кошки-мышки', category: 'Новички МЖ', avatar: '🐱', members: ['Кучер Оксана', 'Кочетков Александр'], wod1_1: { result: '130 кал', points: 75 }, wod1_2: { result: '237 повт', points: 70 }, wod2: { result: '308 повт', points: 65 }, wod3_1: { result: '7:18 (328 повт)', points: 90 }, wod3_2: { result: '', points: 0 }, final: { place: 6, points: 300 }, totalScore: 300 },
  { id: 33, name: 'ПроМёд', category: 'Новички МЖ', avatar: '🍯', members: ['Воинов Тахир', 'Анненкова Кристина'], wod1_1: { result: '135 кал', points: 80 }, wod1_2: { result: '225 повт', points: 60 }, wod2: { result: '309 повт', points: 70 }, wod3_1: { result: '7:45 (328 повт)', points: 80 }, wod3_2: { result: '', points: 0 }, final: { place: 8, points: 290 }, totalScore: 290 },
  { id: 39, name: 'Белоснежка +1', category: 'Новички МЖ', avatar: '👸', members: ['Рюхина Олеся', 'Стебенев Андрей'], wod1_1: { result: '120 кал', points: 65 }, wod1_2: { result: '240 повт', points: 75 }, wod2: { result: '286 повт', points: 60 }, wod3_1: { result: '9:05 (276 повт)', points: 55 }, wod3_2: { result: '', points: 0 }, final: { place: 9, points: 255 }, totalScore: 255 },
  { id: 310, name: 'Маша и медведь', category: 'Новички МЖ', avatar: '🐻', members: ['Мурашова Алена', 'Мурашов Дмитрий'], wod1_1: { result: '117 кал', points: 55 }, wod1_2: { result: '228 повт', points: 65 }, wod2: { result: '254 повт', points: 50 }, wod3_1: { result: '9:05 (313 повт)', points: 60 }, wod3_2: { result: '', points: 0 }, final: { place: 10, points: 230 }, totalScore: 230 },
  { id: 312, name: 'Битой по зубам', category: 'Новички МЖ', avatar: '🏏', members: ['Евграфов Владимир', 'Евграфова Алла'], wod1_1: { result: '106 кал', points: 50 }, wod1_2: { result: '193 повт', points: 50 }, wod2: { result: '276 повт', points: 55 }, wod3_1: { result: '9:05 (250 повт)', points: 50 }, wod3_2: { result: '', points: 0 }, final: { place: 11, points: 205 }, totalScore: 205 },
  
  // Новички МЖ+
  { id: 520, name: 'Елочные гладиаторы', category: 'Новички МЖ+', avatar: '⚔️', members: ['Озеров Павел', 'Травина Алина'], wod1_1: { result: '151 кал', points: 100 }, wod1_2: { result: '265 повт', points: 90 }, wod2: { result: '348 повт', points: 100 }, wod3_1: { result: '5:31 (328 повт)', points: 100 }, wod3_2: { result: '', points: 0 }, final: { place: 1, points: 390 }, totalScore: 390 },
  { id: 517, name: 'Steel&fire', category: 'Новички МЖ+', avatar: '🔥', members: ['Сикачев Денис', 'Тер-Микаелян Мария'], wod1_1: { result: '147 кал', points: 95 }, wod1_2: { result: '254 повт', points: 80 }, wod2: { result: '338 повт', points: 95 }, wod3_1: { result: '6:31 (328 повт)', points: 85 }, wod3_2: { result: '', points: 0 }, final: { place: 2, points: 355 }, totalScore: 355 },
  { id: 516, name: 'Лило и Стич', category: 'Новички МЖ+', avatar: '🌺', members: ['Сорокина Мария', 'Беляев Владислав'], wod1_1: { result: '138 кал', points: 80 }, wod1_2: { result: '234 повт', points: 75 }, wod2: { result: '338 повт', points: 95 }, wod3_1: { result: '6:21 (328 повт)', points: 90 }, wod3_2: { result: '', points: 0 }, final: { place: 3, points: 340 }, totalScore: 340 },
  { id: 518, name: 'Одуванчики', category: 'Новички МЖ+', avatar: '🌼', members: ['Ларин Иван', 'Подтуркина Екатерина'], wod1_1: { result: '146 кал', points: 90 }, wod1_2: { result: '264 повт', points: 85 }, wod2: { result: '309 повт', points: 70 }, wod3_1: { result: '6:18 (328 повт)', points: 95 }, wod3_2: { result: '', points: 0 }, final: { place: 3, points: 340 }, totalScore: 340 },
  { id: 521, name: 'НЕЛИШНИЕ КИЛОГРАММЫ', category: 'Новички МЖ+', avatar: '⚖️', members: ['Жебуртович Татьяна', 'Жебуртович Сергей'], wod1_1: { result: '138 кал', points: 80 }, wod1_2: { result: '336 повт', points: 100 }, wod2: { result: '318 повт', points: 80 }, wod3_1: { result: '6:40 (328 повт)', points: 80 }, wod3_2: { result: '', points: 0 }, final: { place: 3, points: 340 }, totalScore: 340 },
  { id: 524, name: 'Hoops&Wilde', category: 'Новички МЖ+', avatar: '🏀', members: ['Ляда Тарас', 'Прудникова Екатерина'], wod1_1: { result: '131 кал', points: 50 }, wod1_2: { result: '266 повт', points: 95 }, wod2: { result: '331 повт', points: 85 }, wod3_1: { result: '7:27 (328 повт)', points: 35 }, wod3_2: { result: '', points: 0 }, final: { place: 6, points: 265 }, totalScore: 265 },
  { id: 523, name: 'НикОля', category: 'Новички МЖ+', avatar: '🎅', members: ['Заботин Никита', 'Сенчук Ольга'], wod1_1: { result: '141 кал', points: 85 }, wod1_2: { result: '227 повт', points: 55 }, wod2: { result: '288 повт', points: 40 }, wod3_1: { result: '6:55 (328 повт)', points: 75 }, wod3_2: { result: '', points: 0 }, final: { place: 7, points: 255 }, totalScore: 255 },
  { id: 526, name: 'Ух ты пухты', category: 'Новички МЖ+', avatar: '🎯', members: ['Казарова Эльвира', 'Андреев Владимир'], wod1_1: { result: '132 кал', points: 55 }, wod1_2: { result: '228 повт', points: 65 }, wod2: { result: '298 повт', points: 55 }, wod3_1: { result: '6:56 (328 повт)', points: 70 }, wod3_2: { result: '', points: 0 }, final: { place: 8, points: 245 }, totalScore: 245 },
  { id: 529, name: 'Мутный Енот', category: 'Новички МЖ+', avatar: '🦝', members: ['Башкиров Михаил', 'Васильева Мария'], wod1_1: { result: '135 кал', points: 65 }, wod1_2: { result: '211 повт', points: 40 }, wod2: { result: '311 повт', points: 75 }, wod3_1: { result: '7:10 (328 повт)', points: 60 }, wod3_2: { result: '', points: 0 }, final: { place: 9, points: 240 }, totalScore: 240 },
  { id: 532, name: 'Пухлые утки', category: 'Новички МЖ+', avatar: '🦆', members: ['Кисленко Виталий', 'Хоменко Евгения'], wod1_1: { result: '118 кал', points: 25 }, wod1_2: { result: '228 повт', points: 65 }, wod2: { result: '305 повт', points: 65 }, wod3_1: { result: '7:08 (328 повт)', points: 65 }, wod3_2: { result: '', points: 0 }, final: { place: 10, points: 220 }, totalScore: 220 },
  { id: 527, name: 'Зов Джунглей', category: 'Новички МЖ+', avatar: '🐆', members: ['Тугов Андрей', 'Манукян Яна'], wod1_1: { result: '124 кал', points: 35 }, wod1_2: { result: '225 повт', points: 50 }, wod2: { result: '287 повт', points: 35 }, wod3_1: { result: '7:12 (328 повт)', points: 55 }, wod3_2: { result: '', points: 0 }, final: { place: 11, points: 175 }, totalScore: 175 },
  { id: 522, name: 'Любовь Васильевна меняет профессию', category: 'Новички МЖ+', avatar: '🆕', members: ['Запорожцев Сергей', 'Добровольская Любовь'], wod1_1: { result: '126 кал', points: 40 }, wod1_2: { result: '207 повт', points: 30 }, wod2: { result: '300 повт', points: 60 }, wod3_1: { result: '7:24 (328 повт)', points: 40 }, wod3_2: { result: '', points: 0 }, final: { place: 12, points: 170 }, totalScore: 170 },
  { id: 519, name: 'Елки ИГО голки', category: 'Новички МЖ+', avatar: '🎄', members: ['Клугман Любовь', 'Букарев Сергей'], wod1_1: { result: '114 кал', points: 15 }, wod1_2: { result: '224 повт', points: 45 }, wod2: { result: '296 повт', points: 50 }, wod3_1: { result: '7:17 (328 повт)', points: 50 }, wod3_2: { result: '', points: 0 }, final: { place: 13, points: 160 }, totalScore: 160 },
  { id: 531, name: 'Нас Заставили', category: 'Новички МЖ+', avatar: '😤', members: ['Ворожцов Александр', 'Золкина Мария'], wod1_1: { result: '114 кал', points: 15 }, wod1_2: { result: '230 повт', points: 70 }, wod2: { result: '272 повт', points: 20 }, wod3_1: { result: '7:20 (328 повт)', points: 45 }, wod3_2: { result: '', points: 0 }, final: { place: 14, points: 150 }, totalScore: 150 },
  { id: 525, name: 'Можем хуже', category: 'Новички МЖ+', avatar: '🤷', members: ['Пресняков Михаил', 'Жигулина Наталия'], wod1_1: { result: '137 кал', points: 70 }, wod1_2: { result: '205 повт', points: 15 }, wod2: { result: '282 повт', points: 30 }, wod3_1: { result: '8:13 (328 повт)', points: 20 }, wod3_2: { result: '', points: 0 }, final: { place: 16, points: 135 }, totalScore: 135 },
  { id: 530, name: 'Однофамильцы', category: 'Новички МЖ+', avatar: '👥', members: ['Зотов Федор', 'Зотова Елизавета'], wod1_1: { result: '123 кал', points: 30 }, wod1_2: { result: '210 повт', points: 35 }, wod2: { result: '295 повт', points: 45 }, wod3_1: { result: '7:44 (328 повт)', points: 30 }, wod3_2: { result: '', points: 0 }, final: { place: 15, points: 140 }, totalScore: 140 },
  { id: 515, name: 'Семейные', category: 'Новички МЖ+', avatar: '👨‍👩‍👧', members: ['Виноградова Юлия', 'Кашин Артем'], wod1_1: { result: '134 кал', points: 60 }, wod1_2: { result: '207 повт', points: 30 }, wod2: { result: '251 повт', points: 10 }, wod3_1: { result: '8:21 (328 повт)', points: 15 }, wod3_2: { result: '', points: 0 }, final: { place: 17, points: 115 }, totalScore: 115 },
  { id: 528, name: 'Внуки Деда Мороза', category: 'Новички МЖ+', avatar: '🎅', members: ['Корнев Андрей', 'Михайлова Елена'], wod1_1: { result: '128 кал', points: 45 }, wod1_2: { result: '180 повт', points: 10 }, wod2: { result: '281 повт', points: 25 }, wod3_1: { result: '8:08 (328 повт)', points: 25 }, wod3_2: { result: '', points: 0 }, final: { place: 18, points: 105 }, totalScore: 105 },
  { id: 533, name: 'Киля', category: 'Новички МЖ+', avatar: '⚓', members: ['Астахова Анастасия', 'Кибардина Екатерина', 'Миненкова Мария'], wod1_1: { result: '115 кал', points: 20 }, wod1_2: { result: '207 повт', points: 30 }, wod2: { result: '271 повт', points: 15 }, wod3_1: { result: '9:05 (228 повт)', points: 10 }, wod3_2: { result: '', points: 0 }, final: { place: 19, points: 75 }, totalScore: 75 },
];

interface Workout {
  id: number;
  title: string;
  description: string;
  timecap: string;
  movements: string[];
}

const workouts: Workout[] = [
  {
    id: 1,
    title: 'Комплекс 1',
    description: 'For Time (2 раунда)',
    timecap: 'Timecap: 8 минут',
    movements: [
      '2 Раунда на время:',
      '500m Ski ERG или 500m Row',
      '30 синхронных Double Under',
      '15 Burpees'
    ]
  },
  {
    id: 2,
    title: 'Комплекс 2',
    description: 'AMRAP 11 минут',
    timecap: 'Timecap: 11 минут',
    movements: [
      '11 минут AMRAP',
      '11 Back Squat 60/40kg',
      '11 Box Jump Over 60/50cm',
      '11 Toes to Bar',
      '11 Cal Row/Ski'
    ]
  },
  {
    id: 3,
    title: 'Комплекс 3',
    description: 'For Time',
    timecap: 'Timecap: 10 минут',
    movements: [
      '150 Calories (Row/Assault/Ski)',
      'Затем:',
      '80 синхронных Calorie Assault Bike',
      '80 синхронных Wall Ball 9/6kg'
    ]
  },
  {
    id: 4,
    title: 'Комплекс 4',
    description: 'Chipper',
    timecap: 'Только для категории Про',
    movements: [
      '90 Burpees Over Bar',
      '75 American KB Swing 24/16kg',
      '60 Pull-Ups',
      '45 Hang Power Clean 60/40kg',
      '30 синхронных T2B'
    ]
  }
];

interface Heat {
  time: string;
  category: string;
  teams: string[];
}

interface ScheduleEvent {
  id: number;
  event: string;
  heats: Heat[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

const schedule: ScheduleEvent[] = [
  { 
    id: 1, 
    event: '10:00 Официальная разминка', 
    heats: [],
    status: 'completed' 
  },
  { 
    id: 2, 
    event: '11:00 Брифинг. Старт 1 комплекс', 
    heats: [
      { 
        time: '11:00', 
        category: 'Команды Про',
        teams: [
          '1. Жертвы кроссфита (Команды Про)',
          '2. Синий трактор (Команды Про)'
        ]
      },
    ],
    status: 'completed' 
  },
  { 
    id: 3, 
    event: '11:25 Старт 2-ой комплекс', 
    heats: [
      { 
        time: '11:25', 
        category: 'Заход 1',
        teams: [
          '1. Ёлочный ЕМОМ (Новички МЖ)',
          '2. Белые и красивые (Новички МЖ)',
          '3. Суперы (Новички МЖ)'
        ]
      },
      { 
        time: '11:40', 
        category: 'Заход 2',
        teams: [
          '1. Любят адреналин, но возможно напиток (Новички МЖ)',
          '2. Force of two (Новички МЖ)',
          '3. Стар и млад (Новички МЖ)'
        ]
      },
      { 
        time: '11:55', 
        category: 'Заход 3',
        teams: [
          '1. Белоснежка +1 (Новички МЖ)',
          '2. Маша и медведь (Новички МЖ)',
          '3. Кошки-мышки (Новички МЖ)',
          '4. Битой по зубам (Новички МЖ)'
        ]
      },
      { 
        time: '12:10', 
        category: 'Заход 4',
        teams: [
          '1. Семейные (Новички МЖ+)',
          '2. Лило и Стич (Новички МЖ+)',
          '3. Steel&fire (Новички МЖ+)',
          '4. Одуванчики (Новички МЖ+)'
        ]
      },
      { 
        time: '12:25', 
        category: 'Заход 5',
        teams: [
          '1. Елки ИГО голки (Новички МЖ+)',
          '2. Елочные гладиаторы (Новички МЖ+)',
          '3. НЕЛИШНИЕ КИЛОГРАММЫ (Новички МЖ+)',
          '4. Любовь Васильевна меняет проффесию (Новички МЖ+)'
        ]
      },
      { 
        time: '12:40', 
        category: 'Заход 6',
        teams: [
          '1. НикОля (Новички МЖ+)',
          '2. Hoops&Wilde (Новички МЖ+)',
          '3. Можем хуже (Новички МЖ+)',
          '4. Однофамильцы (Новички МЖ+)'
        ]
      },
      { 
        time: '12:55', 
        category: 'Заход 7',
        teams: [
          '1. Зов Джунглей (Новички МЖ+)',
          '2. Внуки Деда Мороза (Новички МЖ+)',
          '3. Мутный Енот (Новички МЖ+)',
          '4. Ух ты пухты (Новички МЖ+)'
        ]
      },
      { 
        time: '13:10', 
        category: 'Заход 8',
        teams: [
          '1. Нас заставили (Новички МЖ+)',
          '2. Пухлые утки (Новички МЖ+)',
          '3. Киля (Новички МЖ+)'
        ]
      },
    ],
    status: 'completed' 
  },
  { 
    id: 4, 
    event: '13:30 Старт 2-ой комплекс', 
    heats: [
      { 
        time: '13:30', 
        category: 'Команды Про',
        teams: [
          '1. Жертвы кроссфита (Команды Про)',
          '2. Синий трактор (Команды Про)'
        ]
      },
    ],
    status: 'completed' 
  },
  { 
    id: 5, 
    event: '14:00 Обед', 
    heats: [],
    status: 'completed' 
  },
  { 
    id: 6, 
    event: '14:15 Старт 3-ий комплекс', 
    heats: [
      { 
        time: '14:15', 
        category: 'Заход 1',
        teams: [
          '1. Жертвы кроссфита (Команды Про)',
          '2. Синий трактор (Команды Про)'
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
          '4. Однофамильцы (Новички МЖ+)'
        ]
      },
      { 
        time: '15:15', 
        category: 'Заход 6',
        teams: [
          '1. Ёлочный ЕМОМ (Новички МЖ)',
          '2. Белые и красивые (Новички МЖ)',
          '3. Суперы (Новички МЖ)',
          '4. Hoops&Wilde (Новички МЖ+)'
        ]
      },
      { 
        time: '15:25', 
        category: 'Заход 7',
        teams: [
          '1. Стар и млад (Новички МЖ)',
          '2. НикОля (Новички МЖ+)',
          '3. Можем хуже (Новички МЖ+)',
          '4. Любовь Васильевна меняет проффесию (Новички МЖ+)'
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
    status: 'completed' 
  },
  { 
    id: 7, 
    event: '16:15 Старт 4-ый комплекс', 
    heats: [
      { 
        time: '16:15', 
        category: 'Команды Про',
        teams: [
          '1. Жертвы кроссфита (Команды Про)',
          '2. Синий трактор (Команды Про)'
        ]
      },
    ],
    status: 'completed' 
  },
  { 
    id: 8, 
    event: '16:50 Награждение победителей', 
    heats: [],
    status: 'completed' 
  },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Новички МЖ');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

  const filteredParticipants = mockParticipants
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => a.final.place - b.final.place);

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
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Команды</div>
              </div>
              <div className="h-12 sm:h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold">4</div>
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Комплекса</div>
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
            <div className="flex flex-wrap gap-3 justify-center">
              {['Команды Про', 'Новички МЖ', 'Новички МЖ+'].map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground shadow-xl scale-105' 
                      : 'bg-white/90 hover:bg-white hover:scale-105'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredParticipants.map((participant, index) => (
                <Card 
                  key={participant.id} 
                  className={`bg-white/95 backdrop-blur-sm border-2 transition-all hover:shadow-xl ${
                    index === 0 ? 'border-yellow-400' : 
                    index === 1 ? 'border-gray-400' : 
                    index === 2 ? 'border-amber-600' : 
                    'border-white/50'
                  }`}
                >
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => setExpandedTeam(expandedTeam === participant.id ? null : participant.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{participant.avatar}</div>
                        <div>
                          <CardTitle className="text-base sm:text-xl flex items-center gap-2">
                            {participant.name}
                            {index === 0 && <Badge className="bg-yellow-400 text-yellow-900">🥇 1 место</Badge>}
                            {index === 1 && <Badge className="bg-gray-400 text-gray-900">🥈 2 место</Badge>}
                            {index === 2 && <Badge className="bg-amber-600 text-white">🥉 3 место</Badge>}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{participant.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl sm:text-3xl font-bold text-primary">{participant.final.points}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">баллов</div>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedTeam === participant.id && (
                    <CardContent className="pt-0 space-y-6 animate-fade-in">
                      {participant.members && participant.members.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-sm mb-2 text-blue-900 flex items-center gap-2">
                            <Icon name="Users" size={16} />
                            Состав команды
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {participant.members.map((member, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-white/80 text-xs sm:text-sm">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon name="Dumbbell" size={16} className="text-green-700" />
                            <h4 className="font-semibold text-sm text-green-900">Комплекс 1</h4>
                          </div>
                          <div className="space-y-1 text-xs sm:text-sm">
                            <p><span className="font-medium">Часть 1:</span> {participant.wod1_1.result} <Badge className="ml-2 bg-green-600">{participant.wod1_1.points} б</Badge></p>
                            <p><span className="font-medium">Часть 2:</span> {participant.wod1_2.result} <Badge className="ml-2 bg-green-600">{participant.wod1_2.points} б</Badge></p>
                          </div>
                        </div>

                        <div className="space-y-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon name="Target" size={16} className="text-blue-700" />
                            <h4 className="font-semibold text-sm text-blue-900">Комплекс 2</h4>
                          </div>
                          <div className="text-xs sm:text-sm">
                            <p><span className="font-medium">Результат:</span> {participant.wod2.result} <Badge className="ml-2 bg-blue-600">{participant.wod2.points} б</Badge></p>
                          </div>
                        </div>

                        {participant.wod3 && (
                          <div className="space-y-2 bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Icon name="Zap" size={16} className="text-purple-700" />
                              <h4 className="font-semibold text-sm text-purple-900">Комплекс 3</h4>
                            </div>
                            <div className="text-xs sm:text-sm">
                              <p><span className="font-medium">Результат:</span> {participant.wod3.result} <Badge className="ml-2 bg-purple-600">{participant.wod3.points} б</Badge></p>
                            </div>
                          </div>
                        )}

                        {participant.wod3_1 && (
                          <div className="space-y-2 bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Icon name="Zap" size={16} className="text-purple-700" />
                              <h4 className="font-semibold text-sm text-purple-900">Комплекс 3</h4>
                            </div>
                            <div className="space-y-1 text-xs sm:text-sm">
                              <p><span className="font-medium">Часть 1:</span> {participant.wod3_1.result} <Badge className="ml-2 bg-purple-600">{participant.wod3_1.points} б</Badge></p>
                              {participant.wod3_2 && (
                                <p><span className="font-medium">Часть 2:</span> {participant.wod3_2.result} <Badge className="ml-2 bg-purple-600">{participant.wod3_2.points} б</Badge></p>
                              )}
                            </div>
                          </div>
                        )}

                        {participant.wod4_1 && (
                          <div className="space-y-2 bg-red-50 p-4 rounded-lg border border-red-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Icon name="Flame" size={16} className="text-red-700" />
                              <h4 className="font-semibold text-sm text-red-900">Комплекс 4</h4>
                            </div>
                            <div className="space-y-1 text-xs sm:text-sm">
                              <p><span className="font-medium">Часть 1:</span> {participant.wod4_1.result} <Badge className="ml-2 bg-red-600">{participant.wod4_1.points} б</Badge></p>
                              {participant.wod4_2 && (
                                <p><span className="font-medium">Часть 2:</span> {participant.wod4_2.result} <Badge className="ml-2 bg-red-600">{participant.wod4_2.points} б</Badge></p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            {schedule.map((event) => (
              <Card 
                key={event.id} 
                className={`bg-white/95 backdrop-blur-sm border-l-4 transition-all hover:shadow-xl ${
                  event.status === 'completed' ? 'border-l-green-500' : 
                  event.status === 'in-progress' ? 'border-l-yellow-500' : 
                  'border-l-gray-300'
                }`}
              >
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-3">
                      <Icon 
                        name={event.status === 'completed' ? 'CheckCircle2' : event.status === 'in-progress' ? 'Radio' : 'Clock'} 
                        size={20} 
                        className={
                          event.status === 'completed' ? 'text-green-600' : 
                          event.status === 'in-progress' ? 'text-yellow-600' : 
                          'text-gray-400'
                        }
                      />
                      {event.event}
                    </CardTitle>
                    <Badge variant={event.status === 'completed' ? 'default' : event.status === 'in-progress' ? 'destructive' : 'secondary'}>
                      {event.status === 'completed' ? 'Завершено' : event.status === 'in-progress' ? 'Идет' : 'Ожидается'}
                    </Badge>
                  </div>
                </CardHeader>

                {expandedEvent === event.id && event.heats.length > 0 && (
                  <CardContent className="pt-0 space-y-4">
                    {event.heats.map((heat, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-primary">{heat.time}</Badge>
                          <h4 className="font-semibold text-sm">{heat.category}</h4>
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground ml-4">
                          {heat.teams.map((team, teamIdx) => (
                            <li key={teamIdx} className="flex items-start gap-2">
                              <Icon name="Users" size={14} className="mt-0.5 flex-shrink-0" />
                              <span>{team}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            {workouts.map((workout) => (
              <Card 
                key={workout.id} 
                className="bg-white/95 backdrop-blur-sm border-l-4 border-l-orange-500 hover:shadow-xl transition-all"
              >
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base sm:text-xl flex items-center gap-2">
                        <Icon name="Dumbbell" size={20} className="text-orange-600" />
                        {workout.title}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{workout.description}</p>
                    </div>
                    <Badge className="bg-orange-600 text-white">{workout.timecap}</Badge>
                  </div>
                </CardHeader>

                {expandedWorkout === workout.id && (
                  <CardContent className="pt-0">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                      <ul className="space-y-2">
                        {workout.movements.map((movement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Icon name="ChevronRight" size={16} className="mt-0.5 text-orange-600 flex-shrink-0" />
                            <span>{movement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
