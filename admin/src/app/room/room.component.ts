import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { LoggerService } from '../service/logger.service';
import { AddroomComponent } from '../addroom/addroom.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventbusService, IEventType , EventType } from '../service/eventbus.service';
import { I18nService } from '../service/i18n.service';
import { RoomlinkComponent } from '../roomlink/roomlink.component';
import { Host } from '../define';

export interface RoomElement {
  name: string;
  id: string;
  createTime: string;
  lastActiveTime: string;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'id', 'createTime', 'lastActiveTime', 'operation'];

  rooms: RoomElement[];
  dataSource = new MatTableDataSource<RoomElement>(this.rooms);

  selection = new SelectionModel<RoomElement>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public i18n: I18nService,
    private logger: LoggerService,
    private dialog: MatDialog,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private eventbus: EventbusService,
  ) {
    this.eventbus.room$.subscribe((event: IEventType) => {
      if ( event.type === EventType.room_created ) {
        this.roomList();
      }
    });
  }

  ngOnInit(): void {
    this.roomList();

  }

  addRoom() {
    const dialogRef = this.dialog.open(AddroomComponent, {
      width: '60vw',
      height: '80vh',
      disableClose: true,
    });

  }

  deleteRoom() {
    this.selection.selected.forEach(select => {
      this.logger.debug(JSON.stringify(select));
    });

    let message = '';
    if ( this.selection.selected.length > 1) {
      message = `Conform to delete ${this.selection.selected.length} rooms: \n`;
      let max = this.selection.selected.length;
      if ( max > 5 ) {
        max = 5;
      }

      for (let i = 0; i < max ; i++ ) {
        message += this.selection.selected[i].id + ' ';
      }

      if ( this.selection.selected.length > max ) {
        message += '...';
      }
    } else {
      message = `Conform to delete room '${this.selection.selected[0].id}'`;
    }

    if (confirm(message)) {
      this.selection.selected.forEach((select) => {
        const deleteUrl = Host + '/room/delete/' + select.id;
        this.http.get(deleteUrl).subscribe((res) => {
          this.roomList();
        }, error => {
          this.snackbar.open(`${error.name}: ${error.message}`, 'close', {duration: 5000});
        });
      });

      this.selection.clear();
    }

  }

  editRoom(room) {
    this.logger.debug('editRoom: %s, %s', room.id, room.description);
    this.dialog.open(AddroomComponent, {
      width: '60vw',
      height: '80vh',
      disableClose: true,
      data: {room}
    });
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  roomList() {
    const getUrl = Host + '/room/list';
    this.http.get(getUrl).subscribe(res => {
      this.rooms = res as any;
      this.dataSource = new MatTableDataSource<RoomElement>(this.rooms);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.logger.debug('roomList: ', JSON.stringify(res));
    },
    error => {
      this.snackbar.open(`${error.name}: ${error.message}`, 'close', {duration: 5000});
    });
  }

  roomLink(room) {
    this.dialog.open(RoomlinkComponent, {
      width: '40vw',
      height: '60vh',
      disableClose: true,
      data: {room}
    });
  }
}
