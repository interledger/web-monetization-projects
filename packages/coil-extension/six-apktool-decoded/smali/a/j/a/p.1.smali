.class La/j/a/p;
.super La/j/a/t$b;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/t;->a(La/j/a/g;La/j/a/t$c;I)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic b:Landroid/view/ViewGroup;

.field final synthetic c:La/j/a/g;

.field final synthetic d:La/j/a/t;


# direct methods
.method constructor <init>(La/j/a/t;Landroid/view/animation/Animation$AnimationListener;Landroid/view/ViewGroup;La/j/a/g;)V
    .locals 0

    iput-object p1, p0, La/j/a/p;->d:La/j/a/t;

    iput-object p3, p0, La/j/a/p;->b:Landroid/view/ViewGroup;

    iput-object p4, p0, La/j/a/p;->c:La/j/a/g;

    invoke-direct {p0, p2}, La/j/a/t$b;-><init>(Landroid/view/animation/Animation$AnimationListener;)V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/view/animation/Animation;)V
    .locals 1

    invoke-super {p0, p1}, La/j/a/t$b;->onAnimationEnd(Landroid/view/animation/Animation;)V

    iget-object p1, p0, La/j/a/p;->b:Landroid/view/ViewGroup;

    new-instance v0, La/j/a/o;

    invoke-direct {v0, p0}, La/j/a/o;-><init>(La/j/a/p;)V

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->post(Ljava/lang/Runnable;)Z

    return-void
.end method
