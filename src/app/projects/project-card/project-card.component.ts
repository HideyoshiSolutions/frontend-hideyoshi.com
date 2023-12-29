import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import { faCodeFork, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import {Language, Project} from "../../shared/model/project/project.model";
import {faScaleBalanced} from "@fortawesome/free-solid-svg-icons/faScaleBalanced";
import {
    ApexAnnotations,
    ApexChart, ApexDataLabels,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  colors: string[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
    @Input() inverted: boolean = false;

    @Input() project!: Project;

    @ViewChild('language-chart')
        languageChart: ChartComponent | undefined;

    chartOptions: ChartOptions | undefined;

    // Stats Icons Definitions
    faLicense = faScaleBalanced;

    faStars = faStar;

    faCodeFork = faCodeFork;

    faEye = faEye;

    private windowResizeTimeout: any;

    ngOnInit() {
        if (!!this.project.languages) {
            const windowWidth = window.innerWidth;
            this.chartOptions = this.generateChart(this.project.languages, windowWidth);
        }

    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event: Event) {
        clearTimeout(this.windowResizeTimeout);

        this.windowResizeTimeout = setTimeout(() => {
            if (!this.project.languages) return;
            this.chartOptions = this.generateChart(
                this.project.languages, window.innerWidth
            );
        }, 100);
    }

    get hasLicense(): boolean {
        return this.project.license !== undefined;
    }

    get hasLanguage(): boolean {
        return this.project.languages !== undefined &&
            this.project.languages?.length > 0;
    }

    private generateChart(languages: Language[], windowWidth: number): ChartOptions {
        const responsiveWindowWidth = windowWidth >= 530 ?
            300 : (windowWidth*.8 - 80);

        return {
            series: languages.map(value => value.percentage),
            colors: languages.map(value => value.color),
            chart: {
                width: 380,
                type: "donut"
            },
            labels: languages.map(value => value.name),
            responsive: [
                {
                    breakpoint: 530,
                    options: {
                        chart: {
                            width: responsiveWindowWidth
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ],
            plotOptions: {
                pie: {
                    expandOnClick: true,

                }
            },
            dataLabels: {
                enabled: false
            }
        };
    }
}
