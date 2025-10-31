import {AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {NgxGlideComponent} from "ngx-glide";
import {Stack} from "../../shared/model/stack/stack.model";


@Component({
    selector: 'app-stack-slider',
    templateUrl: './stack-slider.component.html',
    styleUrls: ['./stack-slider.component.css'],
    standalone: false
})
export class StackSliderComponent implements AfterViewInit {
    @ViewChild('ngxGlide')
        ngxGlide!: NgxGlideComponent;

    stacks: Stack[] = [
        {
            name: 'Angular',
            image: './assets/stacks/angular.svg',
            description: 'Angular is a platform for building mobile and desktop web applications.',
        },
        {
            name: 'Next.js',
            image: './assets/stacks/nextjs.svg',
            description: 'React is a JavaScript library for building user interfaces.',
        },
        {
            name: 'FastAPI',
            image: './assets/stacks/fastapi.svg',
            description: 'FastAPI is a modern, fast (high-performance), web framework for building APIs.',
        },
        {
            name: 'Node.js',
            image: './assets/stacks/nodejs.svg',
            description: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment.',
        },
        {
            name: 'Spring Boot',
            image: './assets/stacks/spring.svg',
            description: 'Spring Boot makes it easy to create stand-alone, production-grade APIs',
        },
        {
            name: 'Docker',
            image: './assets/stacks/docker.svg',
            description: 'Docker is a set of platform as a service products to deliver software in packages called containers.',
        },
        {
            name: 'Kubernetes',
            image: './assets/stacks/kubernetes.svg',
            description: 'Kubernetes is an open-source container-orchestration system for automating deployment, scaling, and management.',
        },
        {
            name: 'Terraform',
            image: './assets/stacks/terraform.svg',
            description: 'Terraform is an open-source infrastructure as code software tool.',
        },
        {
            name: 'PostgreSQL',
            image: './assets/stacks/postgresql.svg',
            description: 'PostgreSQL is a free and open-source relational database.',
        },
        {
            name: 'Redis',
            image: './assets/stacks/redis.svg',
            description: 'Redis is an in-memory data structure store.',
        },
        {
            name: 'AWS',
            image: './assets/stacks/aws.svg',
            description: 'Amazon Web Services is a subsidiary of Amazon providing on-demand cloud computing.',
        }
    ]

    constructor(private cd: ChangeDetectorRef) { }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        const numberOfCards = this.getNumberOfCards(event.target.innerWidth);
        this.buildCarousel(numberOfCards);
    }

    ngAfterViewInit(): void {
        if (this.ngxGlide) {
            const numberOfCards = this.getNumberOfCards(window.innerWidth);
            this.buildCarousel(numberOfCards);
        }

        this.cd.detectChanges();
    }

    buildCarousel(numberOfCards: number): void {
        this.ngxGlide.perView = numberOfCards;

        this.ngxGlide.showArrows = false;
        this.ngxGlide.showBullets = false;
        this.ngxGlide.type = 'carousel';
        this.ngxGlide.focusAt = 'center';
        this.ngxGlide.gap = numberOfCards === 1 ? 0 : 10;
        this.ngxGlide.autoplay = 3000;

        this.ngxGlide.recreate();
    }

    get currentIndex(): number {
        return this.ngxGlide?.getIndex();
    }

    isInFocus(stack: Stack): boolean {
        return this.stacks.indexOf(stack) === this.currentIndex;
    }

    private getNumberOfCards(windowWidth: number): number {
        if (windowWidth <= 450) {
            return 1;
        } else if (windowWidth <= 768) {
            return 2;
        } else if (windowWidth <= 975) {
            return 3;
        } else if (windowWidth <= 1440) {
            return 4;
        } else {
            return 5;
        }
    }
}
