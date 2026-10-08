import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastEpisodiesItem } from './last-episodies-item';

describe('LastEpisodiesItem', () => {
  let component: LastEpisodiesItem;
  let fixture: ComponentFixture<LastEpisodiesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastEpisodiesItem],
    }).compileComponents();

    fixture = TestBed.createComponent(LastEpisodiesItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
