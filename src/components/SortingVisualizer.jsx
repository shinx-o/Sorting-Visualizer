import React from 'react'
import './SortingVisualizer.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { getBubbleSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations, getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgos';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function SortingVisualizer() {
    const [array, setArray] = useState([]);
    const [maxSize, setMaxSize] = useState(50);
    const [speed, setSpeed] = useState(50);
    const [disabled, setDisabled] = useState(false);
    const [sortAlgorithm, setSortAlgorithm] = useState('quick');

    const handleSize = (e) => {
        setMaxSize(e.target.value);
    }

    const handleSpeed = (e) => {
        setSpeed(e.target.value);
    }

    const createArray = useCallback(() => {
        const arr = []
        for (let i = 0; i < maxSize; i++) {
            arr.push(randomIntFromInterval(20, 500));
        }
        setArray(arr);
    }, [maxSize]
    )

    useEffect(() => {
        if (!disabled) createArray()
    }, [createArray,disabled]);

    const valuetext = (value) => {
        return value;
    }

    const animate = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = bars[barOneIndex].style;
                const barTwoStyle = bars[barTwoIndex].style;
                const color = i % 3 === 0 ? 'red' : '#3ed4cd';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * speed)
            }
            else {
                setTimeout(() => {
                    const [barOneIndex, barTwoIndex, newHeight1, newHeight2] = animations[i]
                    const barOneStyle = bars[barOneIndex].style;
                    barOneStyle.height = `${newHeight1}px`;
                    const barTwoStyle = bars[barTwoIndex].style;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * speed);
            }
        }
        
    }

    const insertionSorting = () => {
        const animations = getInsertionSortAnimations(array);
        animate(animations);
    }

    const bubbleSorting = () => {
        const animations = getBubbleSortAnimations(array);
        animate(animations);
    }

    const selectionSorting = () => {
        const animations = getSelectionSortAnimations(array);
        animate(animations);
    }

    const mergeSorting = () => {

    }

    const quickSorting = () => {
        const animations = getQuickSortAnimations(array);
        animate(animations);

    }

    const handleSort = (event) => {
        setSortAlgorithm(event.target.value);
    };


    const beginSort = () => {
        setDisabled(true)
        if (sortAlgorithm === 'bubble') {
            bubbleSorting();
        }
        else if (sortAlgorithm === 'insertion') {
            insertionSorting();
        }
        else if (sortAlgorithm === 'selection') {
            selectionSorting();
        }
        else if (sortAlgorithm === 'merge') {
            mergeSorting();
        }
        else {
            quickSorting();
        }

    }

    return (
        <div className="container">
            <div className='nav'>
                <button className="controls" disabled={disabled} onClick={createArray}>Genrate Array</button>
                <Select
                    sx={{ width: '10%', backgroundColor: 'transparent', color: 'white', fontWeight: '600' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortAlgorithm}
                    onChange={handleSort}
                    disabled={disabled}
                >
                    <MenuItem value='bubble'>Bubble Sort</MenuItem>
                    <MenuItem value='insertion'>Insertion Sort</MenuItem>
                    <MenuItem value='selection'>Selection Sort</MenuItem>
                    <MenuItem value='merge'>Merge Sort</MenuItem>
                    <MenuItem value='quick'>Quick Sort</MenuItem>
                </Select>
                <button className="controls sort-btn" disabled={disabled} onClick={() => beginSort()}>Sort</button>
                <button className="controls sort-btn" onClick={() => setDisabled(false)}>Reset</button>
                <div className="slider-container">
                    <span className='slider-size-label'>Array Size</span>
                    <div className="slider-component">
                        <Slider
                            onChange={(e) => handleSize(e)}
                            getAriaValueText={valuetext}
                            defaultValue={50}
                            step={10}
                            min={10}
                            max={100}
                            disabled={disabled}
                        />
                    </div>
                    <span>{maxSize}</span>
                </div>
                <div className="slider-container">
                    <div className="speed">
                        <span className='select-speed-label'>Speed : </span>
                        <Select
                            sx={{ width: '40%', backgroundColor: 'transparent', color: 'white', fontWeight: '600' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={speed}
                            onChange={handleSpeed}
                            disabled={disabled}
                        >
                            <MenuItem value={500}>0.25x</MenuItem>
                            <MenuItem value={200}>0.50x</MenuItem>
                            <MenuItem value={75}>0.75x</MenuItem>
                            <MenuItem value={50}>Normal</MenuItem>
                            <MenuItem value={40}>1.25x</MenuItem>
                            <MenuItem value={30}>1.5x</MenuItem>
                            <MenuItem value={15}>1.75x</MenuItem>
                            <MenuItem value={5}>2x</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
            <div className='bar-container'>
                {
                    array.map((value, idx) => {
                        return (
                            <div className="bar" key={idx} style={{ height: `${value}px` }}>
                                <div className="bar-value">
                                    <span className="text">{value}</span>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
