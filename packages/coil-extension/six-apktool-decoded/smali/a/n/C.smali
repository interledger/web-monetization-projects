.class La/n/C;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/E;->a(Landroid/animation/Animator;La/d/b;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/d/b;

.field final synthetic b:La/n/E;


# direct methods
.method constructor <init>(La/n/E;La/d/b;)V
    .locals 0

    iput-object p1, p0, La/n/C;->b:La/n/E;

    iput-object p2, p0, La/n/C;->a:La/d/b;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object v0, p0, La/n/C;->a:La/d/b;

    invoke-virtual {v0, p1}, La/d/i;->remove(Ljava/lang/Object;)Ljava/lang/Object;

    iget-object v0, p0, La/n/C;->b:La/n/E;

    iget-object v0, v0, La/n/E;->A:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    return-void
.end method

.method public onAnimationStart(Landroid/animation/Animator;)V
    .locals 1

    iget-object v0, p0, La/n/C;->b:La/n/E;

    iget-object v0, v0, La/n/E;->A:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method
