import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mock route params
            queryParams: of({}), // Mock query params
            snapshot: { data: {} }, // Mock snapshot data
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    spyOn(component, 'toggleDarkMode');
    const toggleDarkBtn = fixture.debugElement.query(By.css('#dark-mode-btn'));
    toggleDarkBtn.triggerEventHandler('onClick', null);

    expect(component.toggleDarkMode).toHaveBeenCalled();

    // Dark mode class should be applied to html tag
    // const htmlElement = document.documentElement; // TO FIX: this doesn't point to html tag of my app
    // console.log(htmlElement);

    // if (component.darkModeActive) {
    //   expect(htmlElement.classList.contains('nmail-dark')).toBe(true);
    // } else {
    //   expect(htmlElement.classList.contains('nmail-dark')).toBe(false);
    // }
  });
});
