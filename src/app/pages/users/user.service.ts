import { User } from 'src/app/users/models/user.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userlist!: Observable<User[]>;
  private userCollection!: AngularFirestoreCollection<User>;

  constructor(private readonly afs: AngularFirestore) {
    debugger
    this.userCollection = afs.collection<User>('user');
    this.getUser();
  }

  onDeleteUser(userId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.userCollection.doc(userId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
  onSaveUser(employee: User, userId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = userId || this.afs.createId();
        const data = { id, ...employee };
        const result = await this.userCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  private getUser(): void {
    this.userlist = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as User))
    );
  }
}
