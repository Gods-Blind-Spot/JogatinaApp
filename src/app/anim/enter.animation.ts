import { Animation, AnimationController } from '@ionic/angular';

export const alertShakyEnterAnimation = (baseEl: any, animCtrl: AnimationController) => {

  const baseAnimation = animCtrl.create();
  const backdropAnimation = animCtrl.create()
    .addElement(baseEl.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
      'pointer-events': 'none',
    })
    .afterClearStyles(['pointer-events']);
  const wrapperAnimation = animCtrl.create()
    .addElement(baseEl.querySelector('.alert-wrapper')).keyframes([
      { offset: 0, transform: 'translate(1px, 1px) rotate(0deg)', opacity: 1 },
      { offset: .1, transform: 'translate(1px, 1px) rotate(0deg)' },
      { offset: .2, transform: 'translate(-1px, -2px) rotate(-1deg)' },
      { offset: .3, transform: 'translate(-3px, 0px) rotate(1deg)' },
      { offset: .4, transform: 'translate(3px, 2px) rotate(0deg)' },
      { offset: .5, transform: 'translate(-1px, 2px) rotate(-1deg)' },
      { offset: .6, transform: 'translate(-3px, 1px) rotate(0deg)' },
      { offset: .7, transform: 'translate(3px, 1px) rotate(-1deg)' },
      { offset: .8, transform: 'translate(-1px, -1px) rotate(1deg)' },
      { offset: .9, transform: 'translate(1px, 2px) rotate(0deg)' },
      { offset: 1, transform: 'translate(1px, 1px) rotate(0deg)', opacity: 1 },
    ]);
  return baseAnimation
    .addElement(baseEl)
    .easing('ease-in-out')
    .duration(150)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};
