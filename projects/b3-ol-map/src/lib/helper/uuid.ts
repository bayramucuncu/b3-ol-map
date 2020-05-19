import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidGenerator {
    uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var rand = Math.random() * 16 | 0, v = c == 'x' ? rand : (rand & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}