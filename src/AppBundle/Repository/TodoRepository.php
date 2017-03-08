<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class TodoRepository extends EntityRepository
{
    /**
     * @return array
     */
    public function findAllToArray()
    {
        return $this->createQueryBuilder('t')
            ->select('t.id, t.todo')
            ->orderBy('t.updatedAt', 'ASC')
            ->getQuery()
            ->getArrayResult();
    }
}
