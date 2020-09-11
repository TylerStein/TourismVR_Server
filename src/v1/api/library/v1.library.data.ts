import { V1LibraryEntry } from "./v1.library.interface";
import { Provider } from "@nestjs/common";

export const LibraryData: V1LibraryEntry[] = [
    V1LibraryEntry.from({ id: 1, name: 'Whistler Bungee', location: 'Whistler, BC', durationSeconds: 180, uploadDate: new Date('2020-09-01'), fileName: '360_LondonBridge.mp4' }),
    V1LibraryEntry.from({ id: 2, name: 'Whistler Rafting', location: 'Whistler, BC', durationSeconds: 520, uploadDate: new Date('2020-09-02'), fileName: 'whistlerrafting.mp4' }),
    V1LibraryEntry.from({ id: 3, name: 'Toronto Skydiving', location: 'Toronto, ON', durationSeconds: 400, uploadDate: new Date('2020-09-03'), fileName: 'torontoskydiving.mp4' }),
    V1LibraryEntry.from({ id: 4, name: 'CN Tower Lookout', location: 'Toronto, ON', durationSeconds: 120, uploadDate: new Date('2020-09-04'), fileName: 'cntower.mp4' }),
    V1LibraryEntry.from({ id: 5, name: 'Mount Hua Ascent', location: 'Mount Hua, China', durationSeconds: 650, uploadDate: new Date('2020-09-05'), fileName: 'mounthuaascent.mp4' }),
    V1LibraryEntry.from({ id: 6, name: 'White Cave System', location: 'Tulum, Mexico', durationSeconds: 460, uploadDate: new Date('2020-09-06'), fileName: 'whitecavesystem.mp4' }),
    V1LibraryEntry.from({ id: 7, name: 'Road of Death', location: 'Yungas, Bolivia', durationSeconds: 820, uploadDate: new Date('2020-01-01'), fileName: 'roadofdeath.mp4' }),
];

export const LibraryDataProvider: Provider = {
    provide: 'LibraryData',
    useValue: LibraryData,
}