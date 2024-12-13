import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import './Select.css';

const SelectPesquisavel = ({
    datas,
    selected = null, 
    setSelected,
    placeholder,
}) => {
    return (
        <div className="select">
            <Select
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                value={selected || undefined}
                onChange={(value) => setSelected(value)}
                style={{ width: '250px' }} // Ajusta o tamanho do campo
            >
                {/* Adiciona a opção vazia */}
                <Select.Option value=""></Select.Option>

                {/* Mapeia os dados existentes */}
                {datas.map((data) => (
                    <Select.Option key={data.id} value={data.id}>
                        {data.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

SelectPesquisavel.propTypes = {
    datas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setSelected: PropTypes.func.isRequired,
    // Removido onAssign, caso não seja mais utilizado
};

export default SelectPesquisavel;
