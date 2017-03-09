<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Todo;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * @Template()
     */
    public function indexAction()
    {
    }

    /**
     * @Route("/xhr/list", name="list", methods={"GET"})
     */
    public function listAction()
    {
        $todos = $this->getDoctrine()->getRepository(Todo::class)->findAllToArray();

        return new JsonResponse($todos);
    }

    /**
     * @Route("/xhr/add", name="add", methods={"POST"})
     */
    public function addAction(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse();
        }

        $status = false;
        $result = null;

        $json = json_decode($request->getContent(), true);

        if ($json['todo'] != '') {
            $todo = new Todo();
            $todo->setTodo($json['todo']);

            try {
                $em = $this->getDoctrine()->getManager();
                $em->persist($todo);
                $em->flush();

                $status = true;
                $result = ['id' => $todo->getId()];
            } catch (Exception $e) {
                $result = $e->getMessage();
            }
        }

        return new JsonResponse([
            'status'  => $status,
            'result'  => $result
        ]);
    }

    /**
     * @Route("/xhr/delete/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteAction($id, Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse();
        }

        $status = false;
        $result = null;

        if ($id) {
            try {
                $em = $this->getDoctrine()->getManager();
                $todo = $em->getRepository(Todo::class)->find($id);

                $em->remove($todo);
                $em->flush();

                $status = true;
            } catch (Exception $e) {
                $result = $e->getMessage();
            }
        }

        return new JsonResponse([
            'status'  => $status,
            'result'  => $result
        ]);
    }
}
