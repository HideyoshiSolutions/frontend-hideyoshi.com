import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

    ngOnInit() {
        if (!!this.project.languages) {
            this.chartOptions = this.generateChart(this.project.languages);
        }

    }

    get hasLicense(): boolean {
        return this.project.license !== undefined;
    }

    get hasLanguage(): boolean {
        return this.project.languages !== undefined &&
            this.project.languages?.length > 0;
    }

    private generateChart(languages: Language[]): ChartOptions {
        return {
            series: languages.map(value => value.percentage),
            colors: languages.map(value => value.color),
            chart: {
                width: 380,
                type: "pie"
            },
            labels: languages.map(value => value.name),
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
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
