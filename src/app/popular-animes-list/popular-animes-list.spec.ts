import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularAnimesList } from './popular-animes-list';

describe('PopularAnimesList', () => {
  let component: PopularAnimesList;
  let fixture: ComponentFixture<PopularAnimesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularAnimesList],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularAnimesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
