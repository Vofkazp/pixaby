import {Component, OnInit} from '@angular/core';
import {Pixaby, selectList} from "../../core/interfaces/pixaby";
import {PixabyService} from "../../core/services/pixaby.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SaveOptionsService} from "../../core/services/save-options.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  search: FormGroup;
  data: Pixaby;
  pageIndex = 1;
  option = false;
  pageList: number[] = [];
  categoryList: selectList[] = [
    {name: 'Все', value: ''},
    {name: 'backgrounds', value: 'backgrounds'},
    {name: 'fashion', value: 'fashion'},
    {name: 'nature', value: 'nature'},
    {name: 'science', value: 'science'},
    {name: 'education', value: 'education'},
    {name: 'feelings', value: 'feelings'},
    {name: 'health', value: 'health'},
    {name: 'Люди', value: 'people'},
    {name: 'Религия', value: 'religion'},
    {name: 'places', value: 'places'},
    {name: 'Животные', value: 'animals'},
    {name: 'industry', value: 'industry'},
    {name: 'computer', value: 'computer'},
    {name: 'Еда', value: 'food'},
    {name: 'Спорт', value: 'sports'},
    {name: 'transportation', value: 'transportation'},
    {name: 'Путешествия', value: 'travel'},
    {name: 'buildings', value: 'buildings'},
    {name: 'Бизнес', value: 'business'},
    {name: 'Музыка', value: 'music'}
  ];
  imageTypeList: selectList[] = [
    {name: 'Все', value: 'all'},
    {name: 'Фото', value: 'photo'},
    {name: 'Иллюстрации', value: 'illustration'},
    {name: 'Вектор', value: 'vector'},
  ];
  orientationList: selectList[] = [
    {name: 'Любая', value: 'all'},
    {name: 'Горизонтальная', value: 'horizontal'},
    {name: 'Вертикальная', value: 'vertical'},
  ];
  colorList: selectList[] = [
    {name: 'Все', value: ''},
    {name: 'Оттенки серого', value: "grayscale"},
    {name: 'Прозрачный', value: "transparent"},
    {name: 'Красный', value: "red"},
    {name: 'Оранжевый', value: "orange"},
    {name: 'Желтый', value: "yellow"},
    {name: 'Зеленый', value: "green"},
    {name: 'Бирюзовый', value: "turquoise"},
    {name: 'Голубой', value: "blue"},
    {name: 'Сиреневый', value: "lilac"},
    {name: 'Розовый', value: "pink"},
    {name: 'Белый', value: "white"},
    {name: 'Серый', value: "gray"},
    {name: 'Черный', value: "black"},
    {name: 'Коричневый', value: "brown"},
  ];
  sortList: selectList[] = [
    {name: 'По популярности', value: "popular"},
    {name: 'По последним добавленным', value: "latest"},
  ];
  perPageList: selectList[] = [
    {name: '20', value: "20"},
    {name: '50', value: "50"},
    {name: '100', value: "100"},
  ];

  constructor(
    public pixaby: PixabyService,
    public fb: FormBuilder,
    public router: Router,
    public save: SaveOptionsService
  ) {
  }

  ngOnInit(): void {
    this.initForm(true);
    this.queryParam();
  }

  initForm(isGet: boolean) {
    this.search = this.fb.group({
      perPage: '20',
      text: null,
      category: '',
      imageType: 'all',
      orientation: 'all',
      min_width: '',
      min_height: '',
      colors: '',
      editorsChoice: false,
      safesearch: false,
      order: 'popular'
    });
    if((isGet && this.save.getOptions()) || (isGet && this.save.getPage())) {
      this.pageIndex = this.save.getPage();
      this.search.patchValue(this.save.getOptions());
    }
    this.search.valueChanges.subscribe(() => {
      this.pageIndex = 1;
      this.save.setPage(1);
      this.save.setOptions(this.search.value);
      this.queryParam();
    });
  }

  queryParam() {
    let query: string = '';
    if (this.search.value.text !== null) {
      query += '&q=' + encodeURIComponent(this.search.value.text);
    }
    query += `&page=${this.pageIndex}`;
    query += `&per_page=${this.search.value.perPage}`;
    query += `&image_type=${this.search.value.imageType}`;
    query += `&orientation=${this.search.value.orientation}`;
    if (this.search.value.category !== '') {
      query += `&category=${this.search.value.category}`;
    }
    if (this.search.value.colors !== '') {
      query += `&colors=${this.search.value.colors}`;
    }
    query += `&min_width=${this.search.value.min_width}`;
    query += `&min_height=${this.search.value.min_height}`;
    query += `&editors_choice=${this.search.value.editorsChoice}`;
    query += `&safesearch=${this.search.value.safesearch}`;
    query += `&order=${this.search.value.order}`;


    this.pixaby.getPicture(query).then(res => {
      this.data = res;
      this.paginatorInit();
      console.log(res);
    });
  }

  paginatorInit() {
    this.pageList = [];
    const countPage = Math.ceil(this.data.totalHits / this.search.value.perPage);
    for (let i = 1; i <= countPage; i++) {
      this.pageList.push(i);
    }
  }

  getToPage(page: number) {
    this.pageIndex = page;
    this.save.setPage(page);
    this.queryParam();
  }

  viewImage(id: number) {
    this.router.navigate([`/view/${id}`]);
  }

  clear() {
    this.search.get('text')!.reset();
    this.save.setOptions(this.search.value);
    this.queryParam();
  }

  clearFilter() {
    this.initForm(false);
    this.save.setOptions(this.search.value);
    this.queryParam();
  }
}
