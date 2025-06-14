package com.anjoriarts.entity;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.*;
import java.util.Properties;

public class OrderIdGenerator implements IdentifierGenerator, Configurable {

    private String sequenceName;

    @Override
    public void configure(org.hibernate.type.Type type, Properties params, org.hibernate.service.ServiceRegistry serviceRegistry) {
        this.sequenceName = params.getProperty("seq_name");
        if (this.sequenceName == null) {
            throw new IllegalArgumentException("Missing 'seq_name' parameter for OrderIdGenerator");
        }
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object entity) {
        final String[] result = new String[1];

        session.doWork(connection -> {
            try (PreparedStatement ps = connection.prepareStatement(
                    "UPDATE orders.order_sequence " +
                            "SET next_val = next_val + 1 " +
                            "WHERE seq_name = ? " +
                            "RETURNING prefix, next_val"
            )) {
                ps.setString(1, sequenceName);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    String prefix = rs.getString("prefix");
                    long nextVal = rs.getLong("next_val");
                    result[0] = prefix + nextVal;
                } else {
                    throw new SQLException("No sequence row found for: " + sequenceName);
                }
            }
        });

        return result[0];
    }
}
