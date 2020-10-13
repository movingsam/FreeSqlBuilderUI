import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page, PageView } from './interface/dto';
import { BuilderOptions, BuilderType } from './interface/project';
import { SelectItem } from './interface/selectItem';
import { TemplateType } from './template.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderService {
  constructor(private client: _HttpClient) {}
  /**
   * 获取构建器列表
   */
  getBuilder(page: Page): Observable<PageView<BuilderOptions>> {
    return this.client.get<PageView<BuilderOptions>>(`api/builder?pageNumber=${page.pageNumber}&pageSize=${page.pageSize}`);
  }

  getBuilderSelect(type: BuilderType | undefined): Observable<SelectItem[]> {
    return this.client.get<PageView<BuilderOptions>>(`api/builder?pageNumber=1&pageSize=100&builderType=${type}`).pipe(
      map((m) =>
        m.datas.map<SelectItem>((s: BuilderOptions) => {
          let templateTypeLabel = ``;
          switch (s.templateType) {
            case 0:
              templateTypeLabel = `codefirst`;
              break;
            case 1:
              templateTypeLabel = `dbfirst`;
              break;
            case 2:
              templateTypeLabel = `global`;
              break;
            default:
              templateTypeLabel = `unknow`;
              break;
          }
          const title = `${s.name}[${templateTypeLabel}]`;
          return new SelectItem(s.id.toString(), s.id, title, title);
        }),
      ),
    );
  }
  /**
   * 获取构建器 通过Id
   * @param id 主键
   */
  getBuilderById(id: number): Observable<BuilderOptions> {
    return this.client.get<BuilderOptions>(`api/builder/${id}`);
  }
  /**
   * 新增构建器
   * @param builder 构建器
   */
  createBuilder(builder: BuilderOptions): Observable<BuilderOptions> {
    return this.client.post<BuilderOptions>(`api/builder`, builder);
  }
  /**
   * 删除构建器
   * @param id 主键
   */
  deleteBuilder(id: number): Observable<boolean> {
    return this.client.delete<boolean>(`api/builder/${id}`);
  }
  /**
   * 更新构建器
   * @param builder 构建器
   */
  updateBuilder(builder: BuilderOptions): Observable<BuilderOptions> {
    return this.client.put<BuilderOptions>(`api/builder`, builder);
  }
}
