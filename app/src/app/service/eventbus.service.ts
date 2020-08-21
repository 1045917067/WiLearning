/*
	 * Copyright (c) 2020 Wisting Team. <linewei@gmail.com>
	 *
	 * This program is free software: you can use, redistribute, and/or modify
	 * it under the terms of the GNU Affero General Public License, version 3
	 * or later ("AGPL"), as published by the Free Software Foundation.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT
	 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
	 * FITNESS FOR A PARTICULAR PURPOSE.
	 *
	 * You should have received a copy of the GNU Affero General Public License
	 * along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface IEventType {
  type: string|number;
  data?: any;
  error?: string;
}

export enum EventType {
  socket_connected = 1,
  socket_disconnected,

  media_newPeer,
  media_peerClose,
  media_consumerClosed,
  media_consumerPaused,
  media_consumerResumed,
  media_newConsumer,
  media_consumerScore,

  chat_message,
  chat_emoji,

  overlay_shareMediaClosed,
  overlay_pdfSelectClosed,
  overlay_settingClosed,

  document_docSelect,
  document_docImport,
  document_syncDocInfo,

  pdftranscode_start,
  pdftranscode_end,
  pdftranscode_progress,

  nav_topVideoViewInit,
  nav_topVideoViewDestroy,

  class_start,
  class_stop,
  class_connectVideo,
  class_connectApproval,
  class_disconnectVideo,
  class_announcementTextChange,
}

@Injectable({
  providedIn: 'root'
})
export class EventbusService {
  public socket$ = new Subject();
  public media$ = new Subject();
  public chat$ = new Subject();
  public overlay$ = new Subject();
  public pdftranscode$ = new Subject();
  public docoment$ = new Subject();
  public nav$ = new Subject();
  public selectedTab = new FormControl(0);
  public class$ = new Subject();

  constructor() { }
}
