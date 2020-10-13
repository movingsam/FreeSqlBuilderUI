import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page, PageView } from './interface/dto';
import { Template } from './interface/project';
import { SelectItem } from './interface/selectItem';

export class TemplatePage extends Page {
  templateType: TemplateType;
}

export enum TemplateType {
  CodeFirst,
  DbFirst,
  Global,
  UnKnow,
}
@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private client: _HttpClient) {}
  /**
   * 获取模板分页数据
   * @param page 分页信息
   */
  getTemplatePage(page: TemplatePage): Observable<PageView<Template>> {
    return this.client.get<PageView<Template>>(`api/template/Page`, page);
  }
  /**
   * 刷新模板
   */
  refreshTemplate() {
    return this.client.get<boolean>(`api/template/refresh`);
  }
  /**
   * 获取模板选项
   */
  getTemplateSelect(page: TemplatePage): Observable<SelectItem[]> {
    return this.client
      .get<PageView<Template>>(`api/template/Page?pageNumber=1&pageSize=100`, page)
      .pipe(map((m) => m.datas.map<SelectItem>((d) => new SelectItem(d.id.toString(), d.id, d.templateName, d.templateName))));
  }
}
