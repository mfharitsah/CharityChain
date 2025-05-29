import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { loader } from '../assets';
import FundCard from './FundCard';
import { useStateContext } from '../context';


const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    // dropdown filter state
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('All');
    const options = ['All', 'Created by Me'];

    const { address } = useStateContext();

    // Filter campaigns based on selected option
    const filteredCampaigns = selected === 'All'
        ? campaigns
        : campaigns.filter(campaign => campaign.owner === address);

    return (
        <div>
            <div className='w-full flex justify-between items-center'>
                <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
                <div className="relative w-32 lg:w-40">
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-[#1dc071] w-full h-6 md:h-8 rounded-lg text-white text-xs md:text-sm px-3 flex justify-between items-center cursor-pointer"
                    >
                        {selected}
                        <span>▼</span>
                    </button>

                    {open && (
                        <ul className="absolute w-full mt-1 bg-white rounded shadow max-h-40 overflow-y-auto scroll-smooth z-10">
                            {options.map(opt => (
                                <li key={opt}>
                                    <button
                                        onClick={() => {
                                            setSelected(opt);
                                            setOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-[#1dc071]/20 cursor-pointer"
                                    >
                                        {opt}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!isLoading && filteredCampaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        No campaigns found.
                    </p>
                )}

                {!isLoading && filteredCampaigns.length > 0 && filteredCampaigns.map((campaign) => <FundCard
                    key={uuidv4()}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns