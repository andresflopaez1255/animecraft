import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimeGenres } from './anime-genres';

describe('AnimeGenres', () => {
  let component: AnimeGenres;
  let fixture: ComponentFixture<AnimeGenres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeGenres],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeGenres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
