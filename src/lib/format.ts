import dayjs from 'dayjs';

/** 2026.11.14 の形式 */
export const formatDate = (date: string) => dayjs(date).format('YYYY.MM.DD');
